"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getDashboardData } from "@/services/dashboardService";
import AppLayout from "@/components/Layout/AppLayout";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

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
            <div className="mb-10">
                <DashboardHeader />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Customers" value={dashboard.customerCount} color="bg-blue-600" />
                <StatCard title="Suppliers" value={dashboard.supplierCount} color="bg-green-600" />
                <StatCard title="Stock Items" value={dashboard.stockItemCount} color="bg-purple-600" />
                <StatCard title="Purchases" value={dashboard.purchaseCount} color="bg-orange-500" />
                <StatCard title="Sales" value={dashboard.salesCount} color="bg-pink-600" />
                <StatCard title="Inventory Value" value={`₹ ${dashboard.inventoryValue}`} color="bg-indigo-600" />
                <StatCard title="Purchase Total" value={`₹ ${dashboard.purchaseTotal}`} color="bg-cyan-600" />
                <StatCard title="Sales Total" value={`₹ ${dashboard.salesTotal}`} color="bg-emerald-600" />
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mt-10 overflow-hidden">
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
    color: string;
}

function StatCard({ title, value, color }: StatCardProps) {

    return (
        <div className={`rounded-2xl shadow-xl shadow-blue-100/60 border border-slate-200 p-6 ${color}`}>
            <h2 className="text-white/80 text-sm uppercase tracking-wider">
                {title}
            </h2>
            <p className="text-4xl font-bold text-white mt-4">
                {value}
            </p>
        </div>
    );
}