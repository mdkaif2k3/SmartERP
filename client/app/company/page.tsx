"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCompany } from "@/utils/company";
import axios from "axios";

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
    const [loading, setLoading] = useState(true);

    const handleSelectCompany = (company: Company) => {
        setCompany(company.id, company.name);
        router.push("/dashboard");
    };

    useEffect(() => {
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
        <main className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold mb-8">
                Select Company
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} onSelect={handleSelectCompany} />
                ))}
            </div>
        </main>
    );
}