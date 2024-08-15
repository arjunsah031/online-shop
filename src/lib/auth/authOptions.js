import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const authOptions =  {
  providers: [

    GoogleProvider({

      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile, token) {
        const data = {
            fname: profile.given_name,
            lname: profile.family_name,
            email: profile.email,
            provider: 'GOOGLE',
            externalId: profile.sub,
            image: profile.picture,
        };

        try {
            const user = await prisma.user.upsert({
                where: { email: data.email },
                update: data,
                create: data,
            });

            return {
                ...data,
                name: data.fname,
                id: user.id,
                role: user.role,
            };
        } catch (err) {
            console.error(err);
            return {
                id: '',
            };
        }       
      },

    }),
  ],
    
  callbacks: {
        async session(data) {
            
            return data;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

    }

}
