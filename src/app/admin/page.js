"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/componentsui/avator/avator';
import styles from './page.module.css';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/componentsui/table/table';

const AdminPage = () => {
    const [dashboardData, setDashboardData] = useState({
        totalRevenue: 0,
        subscriptions: 0,
        salesCount:0,
        activeNow: 0,
        transactions: [],
        recentSales: []
    });

    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from your API or directly from the database using Prisma
            const response = await fetch('/api/dashbord');
            const data = await response.json();
            setDashboardData(data);
        };
        
        fetchData();
    }, []);

    return (
        <>
            <div className={`${styles.container}`}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>Total Revenue</div>
                        <DollarSign className={styles.cardIcon} />
                    </div>
                    <div>
                        <div className={styles.cardStats}>${dashboardData.totalRevenue}</div>
                        <p className={styles.cardPercentage}>+20.1% from last month</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>Subscriptions</div>
                        <Users className={styles.cardIcon} />
                    </div>
                    <div>
                        <div className={styles.cardStats}>+{dashboardData.subscriptions}</div>
                        <p className={styles.cardPercentage}>+180.1% from last month</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>Sales</div>
                        <CreditCard className={styles.cardIcon} />
                    </div>
                    <div>
                        <div className={styles.cardStats}>+{dashboardData.salesCount}</div>
                        <p className={styles.cardPercentage}>+19% from last month</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardTitle}>Active Now</div>
                        <Activity className={styles.cardIcon} />
                    </div>
                    <div>
                        <div className={styles.cardStats}>+{dashboardData.activeNow}</div>
                        <p className={styles.cardPercentage}>+201 since last hour</p>
                    </div>
                </div>
            </div>

            <div className={`${styles.grid}`}>
                <div className={styles.transactionsCard}>
                    <div className={styles.transactionsHeader}>
                        <div className={styles.transactionsTitle}>
                            <div>Transactions</div>
                            <div>Recent transactions from your store.</div>
                        </div>
                        <button className={styles.viewAllButton}>
                            <Link href="#">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </button>
                    </div>
                    <div className={styles.transactions}>
            <Table>
                <TableHeader className={styles.tableHeader}>
                    <TableRow className={styles.tableRow}>
                        <TableHead className={styles.tableHead}>Customer</TableHead>
                        <TableHead className={`${styles.tableHead} ${styles.hidden} ${styles.xlTableColumn}`}>
                            Type
                        </TableHead>
                        <TableHead className={`${styles.tableHead} ${styles.hidden} ${styles.xlTableColumn}`}>
                            Status
                        </TableHead>
                        <TableHead className={`${styles.tableHead} ${styles.hidden} ${styles.xlTableColumn}`}>
                            Date
                        </TableHead>
                        <TableHead className={`${styles.tableHead} ${styles.tableCellRight}`}>
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className={styles.tableBody}>
                    {dashboardData.transactions.map((transaction, index) => (
                        <TableRow key={index} className={styles.tableRow}>
                            <TableCell className={styles.tableCell}>
                                <div className="font-medium">{transaction.email}</div>
                                <div className={`${styles.textMuted} ${styles.hidden} ${styles.xlTableColumn}`}>
                                    {transaction.customer}
                                </div>
                            </TableCell>
                            <TableCell className={`${styles.tableCell} ${styles.hidden} ${styles.xlTableColumn}`}>
                                {transaction.type}
                            </TableCell>
                            <TableCell className={`${styles.tableCell} ${styles.hidden} ${styles.xlTableColumn}`}>
                                <div className="text-xs" variant="outline">
                                    {transaction.status}
                                </div>
                            </TableCell>
                            <TableCell className={`${styles.tableCell} ${styles.hidden} ${styles.xlTableColumn}`}>
                                {transaction.createdAt}
                            </TableCell>
                            <TableCell className={`${styles.tableCell} ${styles.tableCellRight}`}>
                                ${transaction.price}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>


                </div>
                
            </div>
        </>
    );
};

export default AdminPage;
