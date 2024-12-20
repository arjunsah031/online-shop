import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from '@/providers/queryprovider'
import Reduxprovider from "@/providers/reduxprovider";
import AuthProvider from "@/providers/authprovider";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         
      <body className={inter.className}>

          <Reduxprovider>

            <QueryProvider>

              <AuthProvider>
                  <main>{children}</main>
             </AuthProvider>
            </QueryProvider>
        
            </Reduxprovider> 
      </body>

    </html>
  );
}
