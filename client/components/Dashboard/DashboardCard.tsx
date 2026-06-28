"use client";

import { useRouter } from "next/navigation";

interface DashboardCardProps {
    title: string;
    description: string;
    route: string;
}

export default function DashboardCard({
    title,
    description,
    route,
}: DashboardCardProps) {

    const router = useRouter();

    return (

        <div className="rounded-xl bg-white shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">
                {title}
            </h2>
            <p className="mt-3 text-gray-600">
                {description}
            </p>
            <button onClick={() => router.push(route)} className="mt-6 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
                Open
            </button>
        </div>
    );
}