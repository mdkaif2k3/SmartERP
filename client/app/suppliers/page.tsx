"use client";

import SupplierForm from "@/components/Supplier/SupplierForm";
import SupplierTable from "@/components/Supplier/SupplierTable";
import AppLayout from "@/components/Layout/AppLayout";
import { createSupplier, getSuppliers, deleteSupplier, updateSupplier } from "@/services/supplierService";
import { useEffect, useState } from "react";
import axios from "axios";

interface Supplier {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

export default function SuppliersPage() {

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

    useEffect(() => {
        fetchSuppliers();
    }, []);
    const fetchSuppliers = async () => {
        try {
            const response = await getSuppliers();
            setSuppliers(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    };

    const handleAddSupplier = async (supplier: {
        name: string;
        mobile: string;
        address: string;
    }) => {
        try {
            await createSupplier(supplier);
            fetchSuppliers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleDeleteSupplier = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this supplier?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteSupplier(id);
            fetchSuppliers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleEditSupplier = (supplier: Supplier) => {
        setEditingSupplier(supplier);
    };

    const handleUpdateSupplier = async (
        id: string,
        supplier: {
            name: string;
            mobile: string;
            address: string;
        }
    ) => {
        try {
            await updateSupplier(id, supplier);
            setEditingSupplier(null);
            fetchSuppliers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingSupplier(null);
    };

    return (
        <AppLayout>
            <SupplierForm onAddSupplier={handleAddSupplier} onUpdateSupplier={handleUpdateSupplier} editingSupplier={editingSupplier} onCancelEdit={handleCancelEdit} />
            <SupplierTable suppliers={suppliers} onDeleteSupplier={handleDeleteSupplier} onEditSupplier={handleEditSupplier} />
        </AppLayout>
    );
}
