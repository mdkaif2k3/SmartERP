"use client";

import { useState } from "react";

interface CustomerFormProps {
    onAddCustomer: (customer: {
        name: string;
        mobile: string;
        address: string;
    }) => void;
}

export default function CustomerForm({ onAddCustomer, }: CustomerFormProps) {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddCustomer({
            name,
            mobile,
            address,
        });
        setName("");
        setMobile("");
        setAddress("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6">
                Add Customer
            </h2>
            <div className="space-y-4">
                <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-3" required />
                <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border rounded-lg p-3" />
                <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-lg p-3" rows={3} />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Add Customer
                </button>
            </div>
        </form>
    );
}