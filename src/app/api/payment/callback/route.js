import { PrismaClient } from '@prisma/client';
import crypto from 'node:crypto';

const prisma = new PrismaClient();

export async function POST(request) {
    const data = await request.json();

    const clonedData = { ...data };

    if (data.is_final === true && data.status === 'paid') {
        const originalSign = clonedData.sign;
        delete clonedData.sign;

        const stringData = Buffer.from(JSON.stringify(clonedData)).toString('base64') + process.env.CRYPTOMUS_API_KEY;
        const sign = crypto.createHash('md5').update(stringData).digest('hex');

        if (originalSign !== sign) {
            return new Response(JSON.stringify({ message: 'Not allowed' }), { status: 403 });
        }

        try {
            await prisma.order.update({
                where: { id: clonedData.order_id },
                data: { status: 'paid' },
            });
        } catch (err) {
            return new Response(JSON.stringify({ message: 'Failed to update an order' }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: 'OK' }), { status: 200 });
    } else if (data.is_final === true && data.status === 'fail') {
        try {
            // Reset the delivery person associated with the order
            await prisma.deliveryPerson.updateMany({
                where: { orderId: clonedData.order_id },
                data: { orderId: null },
            });

            // Reset the inventory associated with the order
            await prisma.inventory.updateMany({
                where: { orderId: clonedData.order_id },
                data: { orderId: null },
            });

            // Delete the order
            await prisma.order.delete({
                where: { id: clonedData.order_id },
            });

            return new Response(JSON.stringify({ message: 'OK' }), { status: 200 });
        } catch (err) {
            return new Response(JSON.stringify({ message: 'Failed to process order failure' }), { status: 500 });
        }
    } else {
        console.log('Ignoring the event.');
        return new Response(JSON.stringify({}), { status: 200 });
    }
}
