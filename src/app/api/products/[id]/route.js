import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {

    const { id } = params;
    console.log(id)
    
    try {

        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
        });

        if (!product) {
            return Response.json({ message: 'Product not found.' }, { status: 400 });
        }
      

        return Response.json(product);

    } catch (err) {

        return Response.json({ message: 'Failed to fetch product' });
    }
  }
