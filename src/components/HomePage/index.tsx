"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Card } from "../Card";
import { SectionTitle } from "../SectionTitle";
import { Button } from "../Button";
import { useNews } from "@/hooks/queries/useNews";
import { Loading } from "./loading";
import { useMemo } from "react";
import Script from "next/script";

export const HomePage = () => {
    const pathname = usePathname();
    const { data, isLoading, error } = useNews();

    const sortedData = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => Number(b.id) - Number(a.id));
    }, [data]);

    // --- SCHEMA JSON-LD PARA HOME (Destaques e Navegação) ---
    const homeSchema = useMemo(() => {
        return {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AutoWebSpec - Comparativos e Fichas Técnicas",
            "description": "Compare carros lado a lado, veja rankings de custo-benefício e as últimas notícias do setor automotivo.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Comparativos em Destaque",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Corolla vs Sentra",
                        "url": "https://autowebspec.com.br/comparar/?carro1=toyota-corolla-2025-gli-2.0&carro2=nissan-sentra-2026-exclusive-2.0-cvt-interior-premium"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Polo vs 208",
                        "url": "https://autowebspec.com.br/comparar/?carro1=volkswagen-polo-2025-highline-170-tsi-at&carro2=peugeot-208-2025-gt-turbo-at"
                    }
                ]
            }
        };
    }, []);

    const dataDestaque = [
        {
            id: "1",
            title: "Corolla vs Sentra",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/toyota/corolla/corolla.webp",
                car2: "/marcas/nissan/sentra/sentra.webp",
            },
            url: "comparar/?carro1=toyota-corolla-2025-gli-2.0&carro2=nissan-sentra-2026-exclusive-2.0-cvt-interior-premium",
        },
        {
            id: "2",
            title: "Polo vs 208",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/volkswagen/polo/polo.webp",
                car2: "/marcas/peugeot/208/208.webp",
            },
            url: "comparar/?carro1=volkswagen-polo-2025-highline-170-tsi-at&carro2=peugeot-208-2025-gt-turbo-at",
        },
        {
            id: "3",
            title: "HB20 vs 208",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/hyundai/hb20/hb20.webp",
                car2: "/marcas/peugeot/208/208.webp",
            },
            url: "comparar/?carro1=hyundai-hb20-2025&carro2=peugeot-208-2025-gt-turbo-at",
        },
    ];

    const dataRanking = [
        { id: 1, position: 1, title: "Mobi", image: "/marcas/fiat/mobi/mobi.webp", url: "ranking" },
        { id: 2, position: 2, title: "Kwid", image: "/marcas/renault/kwid/kwid.webp", url: "ranking" },
        { id: 3, position: 3, title: "HB20", image: "/marcas/hyundai/hb20/hb20.webp", url: "ranking" },
    ];

    if (isLoading) return <Loading />
    if (error) return <p>Erro ao carregar</p>;

    return (
        <div className="grid gap-10 mt-8">

            <Script
                id="comparison-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
            />

            {/* ================= COMPARATIVOS ================= */}
            <section className="space-y-6">
                <SectionTitle size="text-[16px]">Comparativos em Destaque</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataDestaque.map((news) => (
                        <Link
                            key={news.id}
                            href={`${pathname}${news.url}`}
                            className="group"
                        >
                            <Card className="h-full flex flex-col overflow-hidden border-gray-100  transition-all duration-300 hover:shadow-2xl">
                                <div className="relative flex items-center justify-center h-52 bg-radial from-white to-gray-50 p-4">
                                    {/* Badge central VS */}
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="bg-white shadow-md border border-gray-100 w-10 h-10 rounded-full flex items-center justify-center transition-transform">
                                            <span className="text-[#6319F7] font-black text-xs">VS</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <div className="relative w-[42%] aspect-square  transition-transform">
                                            <Image src={news.image.car1} alt={news.title} fill className="object-contain" />
                                        </div>
                                        <div className="relative w-[42%] aspect-square  transition-transform">
                                            <Image src={news.image.car2} alt={news.title} fill className="object-contain" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-1 bg-white">
                                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-[#6319F7] transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-md text-gray-600 mt-2 line-clamp-2">
                                        {news.subtitle}
                                    </p>
                                    <div className="mt-6">
                                        <Button fullWidth className="font-bold tracking-wide">
                                            Comparar Detalhes
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ================= RANKING ================= */}
            <section className="bg-gray-50 -mx-4 px-4 py-16 rounded-4xl">
                <SectionTitle size="text-[16px]">Melhores do Ano por Preço</SectionTitle>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6  mx-auto">
                    {dataRanking.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`${pathname}${item.url}`}
                            className={`group ${index === 0 ? 'lg:col-span-6' : 'lg:col-span-3'}`}
                        >
                            <Card className="h-full relative overflow-hidden bg-white border-none shadow-sm hover:shadow-xl transition-all">
                                {/* Position Badge */}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-2 transition-colors duration-300
      ${item.position === 1
                                            ? 'bg-yellow-400 text-yellow-950'
                                            : item.position === 2
                                                ? 'bg-gray-300 text-gray-800'
                                                : item.position === 3
                                                    ? 'bg-[#A66320] text-white'
                                                    : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {item.position}º Posição
                                    </div>
                                </div>

                                <div className={`relative flex items-center justify-center bg-gray-50/50 ${index === 0 ? 'h-72' : 'h-60'}`}>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>

                                <div className="p-6">
                                    <span className="text-[10px] font-bold text-[#6319F7] uppercase tracking-widest">Categoria Hatch</span>
                                    <h3 className={`font-bold text-gray-900 ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                                        {item.title}
                                    </h3>
                                    {index === 0 && <p className="text-gray-600 text-sm mt-2">O campeão de vendas e custo-benefício desta semana.</p>}
                                    <div className="mt-4 flex items-center text-[#6319F7] font-bold text-md">
                                        Ver Detalhes <ChevronRight size={16} />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ================= NOTÍCIAS ================= */}
            <section className="space-y-6">
                <SectionTitle size="text-[16px]">Últimas Notícias</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedData?.slice(0, 3).map((news) => (
                        <Link
                            key={news.id}
                            href={`/noticias/${news.slug}`}
                            className="group"
                        >
                            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={news.image}
                                        alt={news.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {news.category}
                                    </span>
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">
                                        {news.title}
                                    </h3>

                                    <p className="text-md text-gray-600 line-clamp-3 flex-1">
                                        {news.summary}
                                    </p>

                                    <div className="flex justify-between items-center text-sm text-gray-600 border-t border-gray-100 pt-3 mt-4">
                                        <span>{news.date}</span>
                                        <span className="text-[#6319F7] font-bold flex items-center gap-1">
                                            Ler mais <ChevronRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};


