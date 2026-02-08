"use client"
import { ChevronRight } from "lucide-react";
import { Card } from "../Card";
import { SectionTitle } from "../SectionTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useNews } from "@/hooks/queries/useNews";
import { Loading } from "./loading";
import { useMemo } from "react";

export const NewsList = () => {
    const pathname = usePathname();
    const { data, isLoading, error } = useNews();

    const sortedData = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => b.id - a.id); // Inverti para os IDs maiores (mais recentes) virem primeiro
    }, [data]);

    // --- CÓDIGO DO SCHEMA JSON-LD ---
    const jsonLd = useMemo(() => {
        if (!sortedData.length) return null;

        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": sortedData.map((news, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://autowebspec.com.br${pathname}${news.slug}`,
                "name": news.title,
                "image": news.image
            }))
        };
    }, [sortedData, pathname]);

    if (isLoading) return <Loading />
    if (error) return <p className="text-center py-10">Erro ao carregar notícias</p>;

    return (
        <div className="space-y-6 mt-8">
            {/* Injeção do Schema Org no HEAD */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            <SectionTitle
                subtitle="Autowebspec News"
                description="Fique por dentro dos últimos lançamentos, flagras exclusivos e as tendências que estão moldando o futuro do mercado automotivo."
            >
                Notícias e <br /> Lançamentos
            </SectionTitle>

            {/* Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {sortedData?.slice(0, 1).map(news => (
                    <Link className="col-span-1 md:col-span-2 p-0 overflow-hidden cursor-pointer group" href={`${pathname}${news.slug}`} key={news.id}>
                        <Card>
                            <div className="relative h-64 md:h-80 w-full">
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    width={800} // Aumentei para melhor SEO de imagem no destaque
                                    height={450}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority // Carregamento prioritário para a imagem de destaque
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                                    <span className="bg-[#6319F7] text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">{news.category}</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{news.title}</h3>
                                    <p className="text-gray-200 text-sm md:text-base line-clamp-2">{news.summary}</p>
                                    <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                                        <span>{news.author}</span>
                                        <span>•</span>
                                        <span>{news.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Lista */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedData?.slice(1).map(news => (
                    <Link className="p-0 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow" href={`${pathname}${news.slug}`} key={news.id}>
                        <Card>
                            <div className="h-48 w-full overflow-hidden relative">
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">{news.category}</span>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{news.summary}</p>
                                <div className="flex justify-between items-center text-sm text-gray-600 border-t border-gray-100 pt-3 mt-auto">
                                    <span>{news.date}</span>
                                    <span className="text-[#6319F7] font-bold flex items-center gap-1">Ler mais <ChevronRight size={12} /></span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};