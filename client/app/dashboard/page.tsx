"use client";

import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import ModuleGrid from "@/components/Dashboard/ModuleGrid";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-gray-100 p-10">
            <DashboardHeader />
            <ModuleGrid />
        </main>
    );
}