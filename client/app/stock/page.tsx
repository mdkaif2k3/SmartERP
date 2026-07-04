"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import StockForm from "@/components/Stock/StockForm";
import StockTable from "@/components/Stock/StockTable";
import AppLayout from "@/components/Layout/AppLayout";
import { createStockItem, getStockItems, updateStockItem, deleteStockItem } from "@/services/stockService";
import { getUnits } from "@/services/unitService";

interface Unit {
    id: string;
    name: string;
    symbol: string;
}

interface StockItem {
    id: string;
    name: string;
    sku: string;
    purchasePrice: number;
    salePrice: number;
    gstPercentage: number;
    quantity: number;
    unitId: string;
    unit: Unit;
}

export default function StockPage() {

    const [stockItems, setStockItems] = useState<StockItem[]>([]);
    const [units, setUnits] = useState<Unit[]>([]);
    const [editingStockItem, setEditingStockItem] = useState<StockItem | null>(null);

    useEffect(() => {
        fetchStockItems();
        fetchUnits();
    }, []);

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

    const fetchUnits = async () => {
        try {
            const response = await getUnits();
            setUnits(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleAddStockItem = async (stockData: {
        name: string;
        sku: string;
        purchasePrice: number;
        salePrice: number;
        gstPercentage: number;
        quantity: number;
        unitId: string;
    }) => {
        try {
            await createStockItem(stockData);
            fetchStockItems();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleEditStockItem = (stockItem: StockItem) => {
        setEditingStockItem(stockItem);
    };

    const handleUpdateStockItem = async (
        id: string,
        stockData: {
            name: string;
            sku: string;
            purchasePrice: number;
            salePrice: number;
            gstPercentage: number;
            quantity: number;
            unitId: string;
        }
    ) => {
        try {
            await updateStockItem(id, stockData);
            setEditingStockItem(null);
            fetchStockItems();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleDeleteStockItem = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this stock item?"
        );
        if (!confirmed) return;
        try {
            await deleteStockItem(id);
            fetchStockItems();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingStockItem(null);
    };

    return (
        <AppLayout>
            <StockForm
                units={units}
                editingStockItem={editingStockItem}
                onAddStockItem={handleAddStockItem}
                onUpdateStockItem={handleUpdateStockItem}
                onCancelEdit={handleCancelEdit}
            />

            <StockTable
                stockItems={stockItems}
                onEditStockItem={handleEditStockItem}
                onDeleteStockItem={handleDeleteStockItem}
            />
        </AppLayout>
    );
}