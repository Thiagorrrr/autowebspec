"use client"
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCars } from "@/hooks/queries/useCars";
import { Loading } from "./loading";
import { SectionTitle } from "../SectionTitle";
import { formatPrice } from "@/utils";

const PRICE_OPTIONS = [
  { label: 'Todos os preços', min: 0, max: Infinity },
  { label: 'Até R$ 75k', min: 0, max: 75000 },
  { label: 'R$ 75k - 100k', min: 75000, max: 100000 },
  { label: 'R$ 100k - 200k', min: 100000, max: 200000 },
  { label: 'Acima de R$ 200k', min: 200000, max: Infinity },
];

const ITEMS_PER_PAGE = 15;

export const Ranking = () => {
  const { data, isLoading, error } = useCars();

  // Estados de Filtro
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedYear, setSelectedYear] = useState<string>('Todos');
  const [priceRange, setPriceRange] = useState<string>('Todos os preços');
  const [sortBy, setSortBy] = useState<'menor-preco' | 'maior-preco'>('menor-preco');

  // Estado de Paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Opções dos Selects
  const categories = useMemo(() => ['Todas', ...new Set(data?.map(c => c.category))], [data]);
  const years = useMemo(() => ['Todos', ...new Set(data?.map(c => String(c.year)))].sort().reverse(), [data]);

  // 1. Filtragem e Ordenação Global
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

  // 2. Paginação (Corte do Array)
  const totalPages = Math.ceil(filteredAndSortedCars.length / ITEMS_PER_PAGE);
  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedCars.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedCars, currentPage]);

  // 3. Resetar página ao filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedYear, priceRange, sortBy]);

  if (isLoading) return <Loading />
  if (error) return <p className="text-center py-10 text-red-500">Erro ao carregar ranking.</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 mt-8 px-4 pb-20">
      <SectionTitle
        principal
        subtitle="Market Intelligence"
        description="Compare os valores de mercado e descubra quais modelos oferecem o melhor conjunto técnico pelo menor preço atualizado."
      >
        Ranking de <br /> Preços
      </SectionTitle>
      {/* Header e Filtros */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setSortBy('menor-preco')}
              className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-black rounded-lg transition-all cursor-pointer ${sortBy === 'menor-preco' ? 'bg-white shadow-sm text-[#6319F7]' : 'text-gray-400'}`}
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
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6319F7]/10 cursor-pointer">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Ano</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6319F7]/10 cursor-pointer">
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Preço</label>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full bg-gray-50 border border-gray-100 text-gray-700 text-sm font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6319F7]/10 cursor-pointer">
              {PRICE_OPTIONS.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Ranking */}
      <div className="flex flex-col gap-4">
        {paginatedCars.map((car, index) => {
          // Calcula a posição real no ranking global
          const globalIndex = ((currentPage - 1) * ITEMS_PER_PAGE) + index;

          return (
            <Link
              key={car.id}
              href={`/marcas/${car.make.toLowerCase().replace(/\s+/g, "-")}/${car.model.toLowerCase().replace(/\s+/g, "-")}/${car.year}/${car.version.toLowerCase().replace(/\s+/g, "-")}`}
              className="group bg-white p-3 md:p-4 border border-gray-100 shadow-sm flex flex-row items-center gap-4 md:gap-6 hover:shadow-xl transition-all rounded-2xl"
            >
              <div className="flex flex-col items-center justify-center min-w-[35px] md:min-w-[60px]">
                <span className={`text-xl md:text-3xl font-black italic ${globalIndex < 3 ? 'text-[#6319F7]' : 'text-gray-300'}`}>
                  #{globalIndex + 1}
                </span>
              </div>

              <div className="relative w-28 h-20 md:w-48 md:h-28 shrink-0 overflow-hidden rounded-xl bg-gray-50 shadow-inner">
                <Image
                  src={`/${car.image}`}
                  alt={car.model}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0 py-1">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] md:text-[9px] font-black bg-[#6319F7]/10 text-[#6319F7] px-2 py-0.5 rounded-full uppercase">
                        {car.category}
                      </span>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest hidden sm:block">{car.make}</p>
                    </div>
                    <h2 className="font-bold text-gray-900 text-lg md:text-xl truncate leading-tight">
                      <span className="sm:hidden">{car.make} </span>{car.model}  {car.version}
                    </h2>
                    <p className="text-gray-400 text-[11px] md:text-sm truncate font-medium mt-0.5">
                      {car.year} • {car.specs.stock?.hp}cv
                    </p>
                  </div>

                  <div className="mt-2 md:hidden">
                    <div className="text-[#6319F7] font-black text-lg italic">
                      {formatPrice(car.price)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end min-w-[140px]">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preço Médio</span>
                <div className="text-[#6319F7] font-black text-2xl italic">
                  {car.fipe}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Paginação UI */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all shadow-md"
          >
            Anterior
          </button>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 max-w-full">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`min-w-12 h-12 px-2 rounded-lg font-black text-sm transition-all ${currentPage === page
                  ? 'bg-[#6319F7] text-white shadow-lg shadow-[#6319F7]/20 scale-110'
                  : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentPage(prev => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all shadow-md"
          >
            Próxima
          </button>
        </div>
      )}

      {filteredAndSortedCars.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">Nenhum carro encontrado com esses filtros.</p>
        </div>
      )}
    </div>
  );
};