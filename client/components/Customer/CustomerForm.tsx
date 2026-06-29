"use client";

import { useEffect, useState } from "react";

interface Customer {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

interface CustomerFormProps {
    onAddCustomer: (customer: {
        name: string;
        mobile: string;
        address: string;
    }) => void;

    onUpdateCustomer: (
        id: string,
        customer: {
            name: string;
            mobile: string;
            address: string;
        }
    ) => void;

    editingCustomer: Customer | null;
    onCancelEdit: () => void;
}

export default function CustomerForm({ onAddCustomer, onUpdateCustomer, editingCustomer, onCancelEdit }: CustomerFormProps) {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (editingCustomer) {
            setName(editingCustomer.name);
            setMobile(editingCustomer.mobile || "");
            setAddress(editingCustomer.address || "");
        } else {
            setName("");
            setMobile("");
            setAddress("");
        }
    }, [editingCustomer]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const customerData = {
            name,
            mobile,
            address,
        };
        if (editingCustomer) {
            onUpdateCustomer(
                editingCustomer.id,
                customerData
            );
        } else {
            onAddCustomer(customerData);
        }
        setName("");
        setMobile("");
        setAddress("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
                {editingCustomer ? "Update Customer" : "Add Customer"}
            </h2>
            <div className="space-y-4">
                <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-3" required />
                <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border rounded-lg p-3" />
                <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-lg p-3" rows={3} />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    {editingCustomer ? "Update Customer" : "Add Customer"}
                </button>
                {editingCustomer && (
                <button type="button" onClick={onCancelEdit} className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600">
                    Cancel
                </button>
                )}
            </div>
        </form>
    );
}