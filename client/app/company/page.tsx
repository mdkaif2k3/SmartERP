"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCompany } from "@/utils/company";
import axios from "axios";
import CreateCompanyModal from "@/components/Company/CreateCompanyModal";
import { getCompanies } from "@/services/companyService";
import CompanyCard from "@/components/Company/CompanyCard";


interface Company {
    id: string;
    name: string;
    financialYear: string;
    state: string | null;
}

export default function CompanyPage() {

    const router = useRouter();

    const [companies, setCompanies] = useState<Company[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleSelectCompany = (company: Company) => {
        setCompany(company.id, company.name);
        router.push("/dashboard");
    };

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            setCompanies(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_35%),linear-gradient(to_bottom_right,#f8fbff,#eef6ff,#e7f2ff)] p-10">
            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Welcome Back 👋
                </h1>
                <p className="text-gray-500 mt-2">
                    Select a company to continue.
                </p>
            </div>
            {
                companies.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                        <p className="text-gray-600 mb-6">
                            You haven't created any companies yet.
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition" onClick={() => setShowCreateModal(true)}>
                            Create Your First Company
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {companies.map((company) => (
                            <CompanyCard key={company.id} company={company} onSelect={handleSelectCompany} />
                        ))}
                    </div>
                )
            }
            {
                companies.length < 5 || companies.length == 0 && (
                    <div className="mt-8">
                        <button onClick={() => setShowCreateModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
                            + Create New Company
                        </button>
                    </div>
                )
            }
            <CreateCompanyModal open={showCreateModal} onClose={() => setShowCreateModal(false)} onCompanyCreated={fetchCompanies} />
        </main>
    );
}