import { ChevronRight, Factory } from "lucide-react";

export const Breadcrumbs = (navigation: { view: string; make: string; model: string; year: string; }) => {
    const { view, make, model, year } = navigation;
    if (view === 'versus' || view === 'ranking' || view === 'calculator' || view === 'events' || view === 'brands') return null;

    // Componente simples para exibir o caminho (apenas no desktop)
    return (
        <div className="hidden md:flex items-center text-sm text-gray-500 mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
            <button className="flex items-center gap-1 hover:text-[#6319F7]">
                <Factory size={16} /> Marcas
            </button>
            {make && (
                <>
                    <ChevronRight size={14} className="mx-2" />
                    <button className="font-bold hover:text-[#6319F7]">{make}</button>
                </>
            )}
            {model && (
                <>
                    <ChevronRight size={14} className="mx-2" />
                    <button className="font-bold hover:text-[#6319F7]">{model}</button>
                </>
            )}
            {year && (
                <>
                    <ChevronRight size={14} className="mx-2" />
                    <button className="font-bold hover:text-[#6319F7]">{year}</button>
                </>
            )}
        </div>
    );
};