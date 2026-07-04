"use client";

import { useEffect, useState } from "react";

interface Supplier {
    id: string;
    name: string;
    mobile?: string;
    address?: string;
}

interface SupplierFormProps {
    onAddSupplier: (supplier: {
        name: string;
        mobile: string;
        address: string;
    }) => void;

    onUpdateSupplier: (
        id: string,
        supplier: {
            name: string;
            mobile: string;
            address: string;
        }
    ) => void;

    editingSupplier: Supplier | null;
    onCancelEdit: () => void;
}

export default function SupplierForm({ onAddSupplier, onUpdateSupplier, editingSupplier, onCancelEdit }: SupplierFormProps) {

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (editingSupplier) {
            setName(editingSupplier.name);
            setMobile(editingSupplier.mobile || "");
            setAddress(editingSupplier.address || "");
        } else {
            setName("");
            setMobile("");
            setAddress("");
        }
    }, [editingSupplier]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const supplierData = {
            name,
            mobile,
            address,
        };
        if (editingSupplier) {
            onUpdateSupplier(
                editingSupplier.id,
                supplierData
            );
        } else {
            onAddSupplier(supplierData);
        }
        setName("");
        setMobile("");
        setAddress("");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 mb-8">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-800">
                    {editingSupplier ? "Update Supplier" : "Add Supplier"}
                </h2>
                <p className="text-slate-500 mt-2">
                    {editingSupplier ? "Modify supplier details." : "Enter the supplier information below."}
                </p>
            </div>
            <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700">
                    Supplier Name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Supplier Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" required />
                <label className="block text-sm font-semibold text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" required />
                <label className="block text-sm font-semibold text-slate-700">
                    Address <span className="text-red-500">*</span>
                </label>
                <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" rows={3} required />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                    {editingSupplier ? "Update Supplier" : "Add Supplier"}
                </button>
                {editingSupplier && (
                <button type="button" onClick={onCancelEdit} className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600">
                    Cancel
                </button>
                )}
            </div>
        </form>
    );
}