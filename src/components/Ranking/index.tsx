"use client"
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCars } from "@/hooks/queries/useCars";
import { Loading } from "./loading";
import { SectionTitle } from "../SectionTitle";

const PRICE_OPTIONS = [
  { label: 'Todos os preços', min: 0, max: Infinity },
  { label: 'Até R$ 50k', min: 0, max: 50000 },
  { label: 'R$ 50k - 100k', min: 50000, max: 100000 },
  { label: 'R$ 100k - 200k', min: 100000, max: 200000 },
  { label: 'Acima de R$ 200k', min: 200000, max: Infinity },
];

export const Ranking = () => {
  const { data, isLoading, error } = useCars();

  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedYear, setSelectedYear] = useState<string>('Todos');
  const [priceRange, setPriceRange] = useState<string>('Todos os preços');
  const [sortBy, setSortBy] = useState<'menor-preco' | 'maior-preco'>('menor-preco');

  const categories = useMemo(() => ['Todas', ...new Set(data?.map(c => c.category))], [data]);
  const years = useMemo(() => ['Todos', ...new Set(data?.map(c => String(c.year)))].sort().reverse(), [data]);

  const filteredAndSortedCars = useMemo(() => {
    if (!data) return [];
    return data
      .filter(car => {
        const matchesCategory = selectedCategory === 'Todas' || car.category === selectedCategory;
        const matchesYear = selectedYear === 'Todos' || String(car.year) === selectedYear;
        const selectedRange = PRICE_OPTIONS.find(p => p.label === priceRange);
        const matchesPrice = car.price >= (selectedRange?.min || 0) && car.price <= (selectedRange?.max || Infinity);
        return matchesCategory && matchesYear && matchesPrice;
      })
      .sort((a, b) => sortBy === 'menor-preco' ? a.price - b.price : b.price - a.price);
  }, [data, selectedCategory, selectedYear, priceRange, sortBy]);

  if (isLoading) return <Loading />
  if (error) return <p className="text-center py-10 text-red-500">Erro ao carregar ranking.</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 mt-8 px-4 pb-10">
      {/* Header e Filtros */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <SectionTitle>Ranking de Preços</SectionTitle>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setSortBy('menor-preco')}
              className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-black rounded-lg transition-all  cursor-pointer ${sortBy === 'menor-preco' ? 'bg-white shadow-sm text-[#6319F7]' : 'text-gray-400'}`}
            >
              MENOR PREÇO
            </button>
            <button
              onClick={() => setSortBy('maior-preco')}
              className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-black rounded-lg transition-all cursor-pointer ${sortBy === 'maior-preco' ? 'bg-white shadow-sm text-[#6319F7]' : 'text-gray-400'}`}
            >
              MAIOR PREÇO
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Categoria</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6319F7]/10">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Ano</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6319F7]/10">
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Preço</label>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6319F7]/10">
              {PRICE_OPTIONS.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Ranking */}
      <div className="flex flex-col gap-4">
        {filteredAndSortedCars.map((car, index) => (
          <Link
            key={car.id}
            href={`/marcas/${car.make.toLowerCase().replace(/\s+/g, "-")}/${car.model.toLowerCase().replace(/\s+/g, "-")}/${car.year}/${car.version.toLowerCase().replace(/\s+/g, "-")}`}
            className="group bg-white p-3 md:p-4 border border-gray-100 shadow-sm flex flex-row items-center gap-4 md:gap-6 hover:shadow-xl transition-all"
          >
            {/* Posição lateral compacta no mobile */}
            <div className="flex flex-col items-center justify-center min-w-[30px] md:min-w-[50px]">
              <span className={`text-xl md:text-3xl font-black italic ${index < 3 ? 'text-[#6319F7]' : 'text-gray-400'}`}>
                #{index + 1}
              </span>
            </div>

            {/* Imagem do Carro: Aumentada no mobile (w-32) */}
            <div className="relative w-32 h-24 md:w-52 md:h-32 shrink-0 overflow-hidden rounded-2xl bg-gray-50 shadow-inner">
              <Image
                src={`/${car.image}`}
                alt={car.model}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 min-w-0 py-1">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] md:text-[9px] font-black bg-[#6319F7] text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {car.category}
                    </span>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hidden sm:block">{car.make}</p>
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl truncate leading-tight">
                    <span className="sm:hidden">{car.make} </span>{car.model}
                  </h3>
                  <p className="text-gray-400 text-[11px] md:text-sm truncate font-medium mt-0.5">
                    {car.year} • {car.specs.stock?.hp}cv
                  </p>
                </div>

                {/* Preço Mobile (aparece abaixo do texto no mobile) */}
                <div className="mt-2 md:hidden">
                  <div className="text-[#6319F7] font-black text-lg leading-none italic">
                    {car.fipe}
                  </div>
                </div>
              </div>
            </div>

            {/* Preço Desktop (oculto no mobile para evitar aperto) */}
            <div className="hidden md:flex flex-col items-end min-w-[140px]">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preço Médio</span>
              <div className="text-[#6319F7] font-black text-2xl leading-none italic">
                {car.fipe}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};