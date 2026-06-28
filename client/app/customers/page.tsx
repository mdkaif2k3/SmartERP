"use client";

import CustomerForm from "@/components/Customer/CustomerForm";
import CustomerTable from "@/components/Customer/CustomerTable";
import { createCustomer, getCustomers } from "@/services/customerService";
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

    return (
        <main className="min-h-screen bg-gray-100 p-10">
            <CustomerForm onAddCustomer={handleAddCustomer} />
            <CustomerTable customers={customers} />
        </main>
    );
}