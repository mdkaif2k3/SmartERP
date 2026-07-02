"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PurchaseForm from "@/components/Purchase/PurchaseForm";
import PurchaseTable from "@/components/Purchase/PurchaseTable";
import { createPurchaseVoucher, getPurchaseVouchers } from "@/services/purchaseService";
import { getSuppliers } from "@/services/supplierService";
import { getStockItems } from "@/services/stockService";

interface Supplier {
    id: string;
    name: string;
}

interface StockItem {
    id: string;
    name: string;
}

interface PurchaseItem {
    id: string;
    qty: number;
    rate: number;
    amount: number;
    item: StockItem;
}

interface PurchaseVoucher {
    id: string;
    voucherNo: string;
    totalAmount: number;
    supplier: Supplier;
    items: PurchaseItem[];
}

export default function PurchasePage() {

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [stockItems, setStockItems] = useState<StockItem[]>([]);
    const [purchaseVouchers, setPurchaseVouchers] = useState<PurchaseVoucher[]>([]);

    useEffect(() => {
        fetchSuppliers();
        fetchStockItems();
        fetchPurchaseVouchers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await getSuppliers();
            setSuppliers(response.data);
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
    const fetchPurchaseVouchers = async () => {
        try {
            const response = await getPurchaseVouchers();
            setPurchaseVouchers(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };
    const handleCreatePurchase = async (purchase: {
        voucherNo: string;
        supplierId: string;
        itemId: string;
        qty: number;
        rate: number;
    }) => {
        try {
            await createPurchaseVoucher(purchase);
            fetchPurchaseVouchers();
            fetchStockItems();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };
    return (

        <main className="min-h-screen bg-gray-100 p-10">
            <PurchaseForm
                suppliers={suppliers}
                stockItems={stockItems}
                onCreatePurchase={handleCreatePurchase}
            />
            <PurchaseTable
                purchaseVouchers={purchaseVouchers}
            />
        </main>
    );
}