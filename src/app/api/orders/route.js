import axios from 'axios';
import crypto from 'node:crypto';
import { authOptions } from '@/lib/auth/authOptions';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: 'Not allowed' }), { status: 401 });
    }

    const data = await req.json();
    const { address, pincode, qty, productId } = data;

    // Find warehouse by pincode
    const warehouseResult = await prisma.warehouse.findMany({
        where: { pincode },
        select: { id: true }
    });

    if (!warehouseResult.length) {
        return new Response(JSON.stringify({ message: 'No warehouse found' }), { status: 400 });
    }

    // Find product by productId
    const foundProducts = await prisma.product.findMany({
        where: { id: productId },
        take: 1
    });

    if (!foundProducts.length) {
        return new Response(JSON.stringify({ message: 'No product found' }), { status: 400 });
    }

    let transactionError = '';
    let finalOrder = null;

    try {
        finalOrder = await prisma.$transaction(async (tx) => {
            // Create order
            const order = await tx.order.create({
                data: {
                    address,
                    qty: +qty,
                    productId,
                    userId: session.token.id,
                    price: foundProducts[0].price * qty,
                    status: 'received',
                },
                select: { id: true, price: true }
            });

            // Check stock

            const availableStock = await tx.inventory.findMany({
                where: {
                    warehouseId: warehouseResult[0].id,
                    productId,
                    
                },
                take: +qty,
                
            });

            if (availableStock.length < qty) {
                transactionError = `Stock is low, only ${availableStock.length} products available`;
                throw new Error(transactionError);
            }

            // Check delivery person availability

            const availablePersons = await tx.deliveryPerson.findMany({
                where: {
                    
                    warehouseId: warehouseResult[0].id
                },
                take: 1,
                
            });

            if (!availablePersons.length) {
                transactionError = `Delivery person is not available at the moment`;
                throw new Error(transactionError);
            }

            // Stock is available and delivery person is available
            // Update inventories table and add order_id

            await tx.inventory.updateMany({
                where: {
                    id: {
                        in: availableStock.map(stock => stock.id)
                    }
                },
                data: { orderId: order.id }
            });
           
            // Update delivery person

            await tx.deliveryPerson.update({
                where: { id: availablePersons[0].id },
                data: { orderId: order.id }
            });
          
            // Update order status to reserved
            await tx.order.update({
                where: { id: order.id },
                data: { status: 'reserved' }
            });

            return order;
        });

        // Return a success response with the order details
    } catch (err) {
        if (transactionError) {
            return new Response(JSON.stringify({ message: transactionError }), { status: 400 });
        } else {
            console.error('Unhandled error:', err);
            return new Response(
                JSON.stringify({
                    message: 'An unexpected error occurred.',
                }), 
                { status: 500 }
            );
        }
    }


     // Payment processing
  try {
    const paymentUrl = "https://api.cryptomus.com/v1/payment";
    const MerchantId = process.env.CRYPTOMUS_MERCHANT_ID;
    const CRYPTOMUS_API_KEY = process.env.CRYPTOMUS_API_KEY;

    if (!MerchantId || !CRYPTOMUS_API_KEY) {
      throw new Error('MerchantId or API Key is missing or incorrect.');
    }

    const paymentData = {
      amount: String(finalOrder.price),
      currency: 'USD',
      order_id: finalOrder.id,
      // Add these if needed:
      url_return: `${process.env.APP_BASE_URL}/payment/return`,
      url_success: `${process.env.APP_BASE_URL}/payment/success`,
      url_callback: `${process.env.APP_BASE_URL}/api/payment/callback`,
    };

    const stringData = Buffer.from(JSON.stringify(paymentData)).toString('base64') + CRYPTOMUS_API_KEY;
    const sign = crypto.createHash('md5').update(stringData).digest('hex');

    const response = await axios.post(paymentUrl, paymentData, {
      headers: {
        merchant: MerchantId,
        sign: sign,
        'Content-Type': 'application/json',
      },
    });

    return new NextResponse(JSON.stringify({ paymentUrl: response.data.result.url }), { status: 200 });

  } catch (error) {
    console.error('Error in Cryptomus Payment API:', error.response ? error.response.data : error.message);
    return new NextResponse(
      JSON.stringify({
        error: error.response ? error.response.data : 'Payment processing failed.',
      }),
      { status: 500 }
    );
  }
    
}


export async function GET() {
    try {
        // Fetch all orders with related product and user data
        const allOrders = await prisma.order.findMany({
            select: {
                id: true,
                product: {
                    select: {
                        name: true,
                        id: true,
                        image: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        fname: true,
                    },
                },
                type: true,
                price: true,
                status: true,
                address: true,
                qty: true,
                createdAt: true,
            },
            orderBy: { id: 'desc' },
        });

        // Transform data to the desired format
        const formattedOrders = allOrders.map(order => ({
            id: order.id,
            product: order.product.name,
            productId: order.product.id,
            userId: order.user.id,
            user: order.user.fname,
            type: order.type,
            price: order.price,
            image: order.product.image,
            status: order.status,
            address: order.address,
            qty: order.qty,
            createAt: order.createdAt,
        }));

        return new Response(JSON.stringify(formattedOrders));
    } catch (error) {
        console.error('Error retrieving orders:', error);
        return new Response(JSON.stringify({ message: 'Error retrieving orders' }), { status: 500 });
    }
}
