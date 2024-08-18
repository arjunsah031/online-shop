const { z } = require('zod');
const { writeFile } = require('fs/promises');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { getServerSession } = require('next-auth');
const { authOptions } = require('@/lib/auth/authOptions');

const prisma = new PrismaClient();

const isServer = typeof window === 'undefined';

const productSchema = z.object({
    name: z.string().min(4, { message: 'Product name should be a string with at least 4 characters' }),
    image: z.custom((value) => {
        if (isServer) {
            return typeof value === 'object' && value !== null && 'name' in value;
        }
        return value instanceof FileList;
    }, { message: 'Product image should be a valid image file' }),
    description: z.string().min(8, { message: 'Product description should be a string with at least 8 characters' }),
    price: z.number({ message: 'Product price should be a number' }),
});

export async function POST(req, res) {
    

    const data = await req.formData();

    let validatedData;
    try {
        validatedData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image'),
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    const inputImage = validatedData.image;
    const filename = `${Date.now()}.${inputImage.name.split('.').pop()}`; // e.g., 213123123123.png

    try {
        const buffer = Buffer.from(await inputImage.arrayBuffer());
        const filePath = path.join(process.cwd(), 'public/assets', filename);
        await writeFile(filePath, buffer);
    } catch (err) {
        return Response.json({ message: 'Failed to save the file to fs', error: err.message });
    }

    try {
        await prisma.product.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                price: validatedData.price,
                image: filename,
            },
        });
    } catch (err) {
        return Response.json({ message: 'Failed to store product into the database', error: err.message });
    }

    return Response.json({ message: 'OK' });
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

