
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    
    const data  = await req.json();

    const { sku, warehouseId, productId } = data

    if( !sku || !warehouseId || !productId ) {

        return Response.json( { message : "enter valid sku warehouseId and orderid..."})
    }

    try {
        const newDeliveryPerson = await prisma.inventory.create({
            data: {
                sku,
                warehouseId,
                productId
            }
          });
        return Response.json(newDeliveryPerson, { status: 201 });

    } catch (err) {

        return Response.json(
            { message: 'Failed to store the delivery person into the database' },
            { status: 500 }
        );
    }
}

export async function GET() {
    
    try {
        const allInventories = await prisma.inventory.findMany({
            include: {
                warehouse: {
                    select: {
                        name: true,
                    },
                },
                product: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });

        const inventories = allInventories.map(inventory => ({
            id: inventory.id,
            sku: inventory.sku,
            warehouse: inventory.warehouse.name,
            product: inventory.product.name,
        }));

        return Response.json(inventories);
    } catch (err) {
        return Response.json({ message: 'Failed to fetch inventories' });
    }

}