"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SalesForm from "@/components/Sales/SalesForm";
import SalesTable from "@/components/Sales/SalesTable";
import { createSalesVoucher, getSalesVouchers } from "@/services/salesService";
import { getCustomers } from "@/services/customerService";
import { getStockItems } from "@/services/stockService";

interface Customer {
    id: string;
    name: string;
}

interface StockItem {
    id: string;
    name: string;
}

interface SalesItem {
    id: string;
    qty: number;
    rate: number;
    amount: number;
    item: StockItem;
}

interface SalesVoucher {
    id: string;
    voucherNo: string;
    totalAmount: number;
    customer: Customer;
    items: SalesItem[];
}

export default function SalesPage() {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [stockItems, setStockItems] = useState<StockItem[]>([]);
    const [salesVouchers, setSalesVouchers] = useState<SalesVoucher[]>([]);

    useEffect(() => {
        fetchCustomers();
        fetchStockItems();
        fetchSalesVouchers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await getCustomers();
            setCustomers(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };
    const fetchStockItems = async () => {
        try {
            const response = await getStockItems();
            setStockItems(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };
    const fetchSalesVouchers = async () => {
        try {
            const response = await getSalesVouchers();
            setSalesVouchers(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };
    const handleCreateSales = async (sales: {
        voucherNo: string;
        customerId: string;
        itemId: string;
        qty: number;
        rate: number;
    }) => {
        try {
            await createSalesVoucher(sales);
            fetchSalesVouchers();
            fetchStockItems();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };
    return (

        <main className="min-h-screen bg-gray-100 p-10">
            <SalesForm
                customers={customers}
                stockItems={stockItems}
                onCreateSales={handleCreateSales}
            />
            <SalesTable
                salesVouchers={salesVouchers}
            />
        </main>
    );
}