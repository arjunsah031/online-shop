
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export  async function POST(req) {
  
    const data =  await req.json();

    const {name, pincode } = data;

    if( !name || !pincode) {

        return Response.json( { message : "enter valid name and picode"})
    }

    try {
      
      const newWarehouse = await prisma.warehouse.create({
        data: {
            name,
            pincode,
        },
      });

      return Response.json(newWarehouse, { status : 200});

    } catch (err) {

      return Response.json({ message: err.message });
    }

  
}

export async function GET() {

    try {
        const allWarehouses = await prisma.warehouse.findMany();
        return Response.json(allWarehouses);
      } catch (err) {
        return Response.json({ message: 'Failed to fetch all warehouses' });
      }
    
}
