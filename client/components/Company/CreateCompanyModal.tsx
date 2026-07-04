"use client";

import { useState } from "react";
import axios from "axios";
import { createCompany } from "@/services/companyService";

interface CreateCompanyModalProps {
    open: boolean;
    onClose: () => void;
    onCompanyCreated: () => void;
}

export default function CreateCompanyModal({ open, onClose, onCompanyCreated }: CreateCompanyModalProps) {
    if (!open) return null;
    const [name, setName] = useState("");
    const [gstNumber, setGstNo] = useState("");
    const [address, setAddress] = useState("");
    const [financialYear, setFinancialYear] = useState("");
    const [state, setState] = useState("");
    const [loading, setLoading] = useState(false);
    const handleCreateCompany = async () => {
        try {
            setLoading(true);
            await createCompany({
                name,
                financialYear,
                state,
                gstNumber,
                address
            });
            setName("");
            setGstNo("");
            setAddress("");
            setFinancialYear("");
            setState("");

            onCompanyCreated();
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Create Company
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
                        ✕
                    </button>
                </div>
                <div className="space-y-4">
                    <input type="text" placeholder="Company Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-3" />
                    <input type="text" placeholder="Financial Year"  value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} className="w-full border rounded-lg p-3" />
                    <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="w-full border rounded-lg p-3" />
                    <input type="text" placeholder="GST Number" value={gstNumber} onChange={(e) => setGstNo(e.target.value)} className="w-full border rounded-lg p-3" />
                    <textarea placeholder="Address" rows={4} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-lg p-3" />
                </div>
                <div className="flex justify-end gap-3 mt-8">
                    <button onClick={onClose} className="px-6 py-3 rounded-lg border">
                        Cancel
                    </button>
                    <button onClick={handleCreateCompany} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                        Create Company
                    </button>
                </div>
            </div>
        </div>
    );
}