"use client"
import { ChevronRight, Factory } from "lucide-react";
import Link from "next/link";

export const Breadcrumbs = (navigation: { make?: string; model?: string; year?: string; }) => {
    const { make, model, year } = navigation;

    // Componente simples para exibir o caminho (apenas no desktop)
    return (
        <div className="hidden md:flex items-center text-sm text-gray-500 mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <Link className="flex items-center gap-1 hover:text-[#6319F7]" href={"/marcas"}>
                <Factory size={16} /> Marcas
            </Link>
            {make && (
                <>
                    <ChevronRight size={14} className="mx-2" />
                    <Link className="font-bold hover:text-[#6319F7]" href={`/marcas/${make}`}>{make}</Link>
                </>
            )}
            {model && (
                <>
                    <ChevronRight size={14} className="mx-2" />
                    <Link className="font-bold hover:text-[#6319F7]" href={`/marcas/${make}/${model}`}>{model}</Link>
                </>
            )}
            {year && (
                <>
                    <ChevronRight size={14} className="mx-2" />
                    <Link className="font-bold hover:text-[#6319F7]" href={`/marcas/${make}/${model}/${year}`}>{year}</Link>
                </>
            )}
        </div>
    );
};