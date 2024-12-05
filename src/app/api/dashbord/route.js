import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(req, res) {

    const session = await getServerSession(authOptions);
    console.log(session)

    if (!session) {
        return new Response(JSON.stringify({ message: 'Not allowed' }), { status: 401 });
    }

    try {

        const total = await prisma.order.findMany({
            where: {
                status: 'paid',
            },
            select: {
                price: true,
            },
        });
        
        // Calculate the total price
        const totalRevenue = total.reduce((sum, order) => sum + order.price, 0);
        
       

        

       
        const orders = await prisma.order.findMany({
            where: {
                status: 'paid',
            },
            select: {
                id: true,
                price: true,
                address: true,
                createdAt: true,
                product: true, // Include product details
            },
        });

        const sales = orders.map(order => ({
            id: order.id,
            product: order.product.name,
            price: order.price,
            address: order.address,
        }));

        const salesCount = sales.length; // Get the length of the sales array

        const transactionsData = await prisma.order.findMany({
            select: {
                id: true,
                status:true,
                type:true,
                price: true,
                address: true,
                createdAt: true,
                product: true,
                createdAt:true,
                // Include product details
            },
        });

        const transactions = transactionsData.map(order => ({
            id: order.id,
            product: order.product.name,
            price: order.price,
            address: order.address,
            status:order.status,
            type:order.type,
            createdAt:order.createdAt,
            customer:session.token.name,
            email:session.token.email
            
        }));

        const activeNow = 3
        const subscriptions = '1k'
        

        return new Response(
            JSON.stringify({ totalRevenue, subscriptions, salesCount, activeNow,  transactions }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch dashboard data' }),
            { status: 500 }
        );
    }
}
