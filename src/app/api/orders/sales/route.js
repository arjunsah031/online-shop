import { authOptions } from '@/lib/auth/authOptions';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(request) {

  
    

    try {
        const orders = await prisma.order.findMany({
            where: {
                status: 'paid', // Assuming session.user.id contains the user ID
            },
            
            select: {
                id: true,
                price: true,
                address: true,
                createdAt: true,
                product: true, // Include product details
            },
        });

        const myOrders = orders.map(order => ({
            id: order.id,
            product: order.product.name,
            price: order.price,
            address: order.address,

        }));

        return new Response(JSON.stringify(myOrders), { status: 200 });
    } catch (err) {
        console.error('Error fetching orders:', err); // Log the error for debugging
        return new Response(JSON.stringify({ message: 'Failed to get my orders' }), { status: 500 });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client after the query
    }
}
