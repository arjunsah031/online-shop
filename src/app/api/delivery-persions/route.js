
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    
    const data  = await req.json();

    const { name, phone, warehouseId} = data

    if( !name || !phone || !warehouseId) {

        return Response.json( { message : "enter valid name phone and wareshouse id"})
    }

    try {
        const newDeliveryPerson = await prisma.deliveryPerson.create({
            data: {
                name,
                phone,
                warehouseId
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
      const allDeliveryPersons = await prisma.deliveryPerson.findMany({
        include: {
            warehouse: {
                select: {
                    name: true,
                },
            },
        },
    });

    // Transform data
    const transformedData = allDeliveryPersons.map((person) => ({
        id: person.id,
        name: person.name,
        phone: person.phone,
        warehouse: person.warehouse?.name,
    }));

      return Response.json(transformedData);
    } catch (err) {
      return Response.json({ message: 'Failed to fetch all delivery persons' });
    }
}