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

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-800">
                    {editingCustomer ? "Update Customer" : "Add Customer"}
                </h2>
                <p className="text-slate-500 mt-2">
                    {editingCustomer ? "Modify customer details." : "Enter the customer information below."}
                </p>
            </div>
            <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                    Customer Name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" required />
                <label className="block text-sm font-semibold text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" required />
                <label className="block text-sm font-semibold text-slate-700">
                    Address <span className="text-red-500">*</span>
                </label>
                <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" rows={3} required />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                    {editingCustomer ? "Update Customer" : "Add Customer"}
                </button>
                {editingCustomer && (
                <button type="button" onClick={onCancelEdit} className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600">
                    Cancel
                </button>
                )}
            </div>
        </form>
    );
}