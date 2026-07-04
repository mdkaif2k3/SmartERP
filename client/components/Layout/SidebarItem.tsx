"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
    title: string;
    href: string;
    icon: LucideIcon;
}

export default function SidebarItem({ title, href, icon: Icon }: SidebarItemProps) {
    const pathname = usePathname();
    const active = pathname === href;
    return (
        <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${ active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}>
            <Icon size={20} />
            <span>{title}</span>
        </Link>
    );
}