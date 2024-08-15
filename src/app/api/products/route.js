import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export  async function POST (req) {

    const data = await req.json();

    const { name, description , price} = data;

    if( !name || !description || !price ) {

        return Response.json({ message : " enter valid name description and price"})
    }
    try { 
      const product = await prisma.product.create({
        data: {
            name,
            description,
            price: parseInt(price)
        },
      });

    } catch (error) {
       return Response.json({ message: 'Internal Server Error', error },{status:500});
    }
    return Response.json({ message: 'insterda data ' } , {status : 200 });
}


export async function GET (req) {

    try {
        const allproducts = await prisma.product.findMany();

        return Response.json( allproducts, {
            status : 200
        })

    }catch {

        return Response.json( { message : "some tisngis worong"})

    }

}

