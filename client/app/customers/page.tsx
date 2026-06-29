"use client";

import CustomerForm from "@/components/Customer/CustomerForm";
import CustomerTable from "@/components/Customer/CustomerTable";
import { createCustomer, getCustomers, deleteCustomer, updateCustomer } from "@/services/customerService";
import { useEffect, useState } from "react";
import axios from "axios";

interface Customer {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

export default function CustomersPage() {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, []);
    const fetchCustomers = async () => {
        try {
            const response = await getCustomers();
            setCustomers(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        }
    };

    const handleAddCustomer = async (customer: {
        name: string;
        mobile: string;
        address: string;
    }) => {
        try {
            await createCustomer(customer);
            fetchCustomers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleDeleteCustomer = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteCustomer(id);
            fetchCustomers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleEditCustomer = (customer: Customer) => {
        setEditingCustomer(customer);
    };

    const handleUpdateCustomer = async (
        id: string,
        customer: {
            name: string;
            mobile: string;
            address: string;
        }
    ) => {
        try {
            await updateCustomer(id, customer);
            setEditingCustomer(null);
            fetchCustomers();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
    };

    return (
        <main className="min-h-screen bg-gray-100 p-10">
            <CustomerForm onAddCustomer={handleAddCustomer} onUpdateCustomer={handleUpdateCustomer} editingCustomer={editingCustomer} onCancelEdit={handleCancelEdit} />
            <CustomerTable customers={customers} onDeleteCustomer={handleDeleteCustomer} onEditCustomer={handleEditCustomer} />
        </main>
    );
}
