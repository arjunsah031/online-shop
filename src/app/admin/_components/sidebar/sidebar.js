import Link from 'next/link';
import CssStyle from './sidebar.module.css';

export default function Sidebar () {
    return (
        <nav className={CssStyle.sidebar}>
            <ul>
                <li>
                    <Link href="/admin">
                       Dasbord
                    </Link>
                </li>
                
                <li>
                    <Link href="/admin/products">
                        Products
                    </Link>
                </li>

                <li>
                    <Link href="/admin/warehouses">
                       Warehouses
                    </Link>
                </li>
                
                <li>
                    <Link href="/admin/delivery-persions">
                        Delivery persons
                    </Link>
                </li>

                <li>
                    <Link href="/admin/orders">
                       Orders
                    </Link>
                </li>
                
                <li>
                    <Link href="/admin/inventories">
                        Inventries
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

