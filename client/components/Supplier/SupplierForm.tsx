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
            <h2 className="text-2xl font-semibold mb-6">
                {editingSupplier ? "Update Supplier" : "Add Supplier"}
            </h2>
            <div className="space-y-4">
                <input type="text" placeholder="Supplier Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-3" required />
                <input type="text" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full border rounded-lg p-3" />
                <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-lg p-3" rows={3} />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    {editingSupplier ? "Update Supplier" : "Add Supplier"}
                </button>
                {editingSupplier && (
                <button type="button" onClick={onCancelEdit} className="ml-4 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600">
                    Cancel
                </button>
                )}
            </div>
        </form>
    );
}