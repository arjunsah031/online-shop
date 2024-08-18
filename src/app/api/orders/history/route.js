import { authOptions } from '@/lib/auth/authOptions';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function GET(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: 'Not allowed' }), { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: session.token.id, // Assuming session.user.id contains the user ID
            },
            
            select: {
                id: true,
                type: true,
                price: true,
                status: true,
                address: true,
                createdAt: true,
                product: true, // Include product details
            },
        });

        const myOrders = orders.map(order => ({
            id: order.id,
            product: order.product.name,
            type: order.type,
            price: order.price,
            image: order.product.image,
            productDescription: order.product.description,
            status: order.status,
            address: order.address,
            createdAt: order.createdAt,
        }));

        return new Response(JSON.stringify(myOrders), { status: 200 });
    } catch (err) {
        console.error('Error fetching orders:', err); // Log the error for debugging
        return new Response(JSON.stringify({ message: 'Failed to get my orders' }), { status: 500 });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client after the query
    }
}
