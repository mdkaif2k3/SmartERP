"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getDashboardData } from "@/services/dashboardService";
import AppLayout from "@/components/Layout/AppLayout";
import NavigationCard from "@/components/Dashboard/NavigationCard";

interface LowStockItem {
    name: string;
    quantity: number;
}

interface DashboardData {
    customerCount: number;
    supplierCount: number;
    stockItemCount: number;
    purchaseCount: number;
    salesCount: number;
    purchaseTotal: number;
    salesTotal: number;
    inventoryValue: number;
    lowStock: LowStockItem[];
}

export default function DashboardPage() {

    const [dashboard, setDashboard] =
        useState<DashboardData | null>(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await getDashboardData();
            setDashboard(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    if (!dashboard) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <AppLayout>
            <h1 className="text-4xl font-bold mb-8">
                Dashboard
            </h1>
            <h2 className="text-2xl font-semibold mb-4">
                Quick Access
            </h2>
            <div className="grid grid-cols-3 gap-6 mb-10">
                <NavigationCard title="Customers" href="/customers" />
                <NavigationCard title="Suppliers" href="/suppliers" />
                <NavigationCard title="Stock" href="/stock" />
                <NavigationCard title="Purchases" href="/purchase" />
                <NavigationCard title="Sales" href="/sales" />
            </div>
            <div className="grid grid-cols-3 gap-6">
                <StatCard title="Customers" value={dashboard.customerCount} />
                <StatCard title="Suppliers" value={dashboard.supplierCount} />
                <StatCard title="Stock Items" value={dashboard.stockItemCount} />
                <StatCard title="Purchases" value={dashboard.purchaseCount} />
                <StatCard title="Sales" value={dashboard.salesCount} />
                <StatCard title="Inventory Value" value={`₹ ${dashboard.inventoryValue}`} />
                <StatCard title="Purchase Total" value={`₹ ${dashboard.purchaseTotal}`} />
                <StatCard title="Sales Total" value={`₹ ${dashboard.salesTotal}`} />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                    Low Stock Items
                </h2>
                {
                    dashboard.lowStock.length === 0 ?
                        (
                            <p>No low stock items 🎉</p>
                        )
                        :
                        (
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2">
                                            Item
                                        </th>
                                        <th className="text-left py-2">
                                            Quantity
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dashboard.lowStock.map((item) => (
                                            <tr key={item.name}>
                                                <td className="py-2">
                                                    {item.name}
                                                </td>
                                                <td className="py-2">
                                                    {item.quantity}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        </AppLayout>
    );
}

interface StatCardProps {
    title: string;
    value: string | number;
}

function StatCard({ title, value, }: StatCardProps) {

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-gray-500 text-lg">
                {title}
            </h2>
            <p className="text-3xl font-bold mt-2">
                {value}
            </p>
        </div>
    );
}