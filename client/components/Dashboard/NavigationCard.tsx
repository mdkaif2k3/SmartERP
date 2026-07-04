"use client";

import Link from "next/link";

interface NavigationCardProps {
    title: string;
    href: string;
}

export default function NavigationCard({ title, href }: NavigationCardProps) {
    return (
        <Link href={href} className=" bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition text-center font-semibold text-lg">
            {title}
        </Link>
    );
}