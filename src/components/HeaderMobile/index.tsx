"use client";

import Link from "next/link";
import { Calendar, DollarSign, Info, Trophy, Car, Home, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavBtnProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const NavBtn: React.FC<NavBtnProps> = ({ href, icon }) => {
    const pathname = usePathname();
    const isActive =
        pathname === href ||
        (href === "/noticias/" && pathname.includes("/noticias")) ||
        (href === "/marcas/" && pathname.includes("/marcas"));
    return (
        <Link href={href}>
            <button
                className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-all 
          ${isActive ? 'text-[#6319F7] transform -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
            >
                {icon}
                {isActive && (
                    <span className="w-1 h-1 bg-[#6319F7] rounded-full"></span>
                )}
            </button>
        </Link>
    );
};

export const HeaderMobile = () => {
    return (
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <NavBtn href="/" icon={<Home size={22} />} label="Home" />
            <NavBtn href="/marcas/" icon={<Car size={22} />} label="Marcas" />
            <NavBtn href="/noticias/" icon={<Newspaper size={22} />} label="Noticias" />
            <NavBtn href="/ranking/" icon={<Trophy size={22} />} label="Ranking" />
            <NavBtn href="/detalhes/" icon={<Info size={22} />} label="Detalhes" />
            <NavBtn href="/custos/" icon={<DollarSign size={22} />} label="Custos" />
            <NavBtn href="/eventos/" icon={<Calendar size={22} />} label="Eventos" />
        </nav>
    );
};
