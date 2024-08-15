import AdminHeader from "./_components/adminheader/adminheader";
import Sidebar from "./_components/sidebar/sidebar";


import CssStyle from './layout.module.css'

export default function RootLayout({ children }) {
    return (
      <html >

        <body className={ CssStyle.bodystyle} >
            <AdminHeader/>
            <Sidebar/>
            <main className={ CssStyle.allpage}>
               {children}
            </main>
          
          </body>
      </html>
    );
  }
  