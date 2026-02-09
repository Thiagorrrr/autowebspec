"use client"
import { ChevronRight, User, ArrowRight } from "lucide-react";
import { SectionTitle } from "../SectionTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { useNews } from "@/hooks/queries/useNews";
import { Loading } from "./loading";
import { useMemo } from "react";

export const NewsList = () => {
    const pathname = usePathname();
    const { data, isLoading, error } = useNews();

    const sortedData = useMemo(() => {
        if (!data) return [];
        return [...data].sort((a, b) => Number(b.id) - Number(a.id));
    }, [data]);

    const canonicalUrl = `https://autowebspec.com.br${pathname}`;

    const jsonLd = useMemo(() => {
        if (!sortedData.length) return null;

        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": sortedData.map((news, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://autowebspec.com.br/noticias/${news.slug}/`,
                "name": news.title,
                "image": news.image
            }))
        };
    }, [sortedData]);

    if (isLoading) return <Loading />
    if (error) return <p className="text-center py-20 text-gray-500 font-medium">Erro ao carregar as últimas notícias.</p>;

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 animate-fadeIn mb-20">
            <link rel="canonical" href={canonicalUrl} />

            {jsonLd && (
                <Script
                    id="news-list-schema"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            <div className="mt-12 mb-12">
                <SectionTitle
                    subtitle="Autowebspec News"
                    description="Fique por dentro dos últimos lançamentos, flagras exclusivos e as tendências que estão moldando o futuro do mercado automotivo."
                >
                    Notícias e <br className="hidden md:block" /> Lançamentos
                </SectionTitle>
            </div>

            {/* DESTAQUE PRINCIPAL (Hero Card) */}
            <div className="mb-16">
                {sortedData?.slice(0, 1).map(news => (
                    <Link
                        href={`/noticias/${news.slug}/`}
                        key={news.id}
                        className="group relative block overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl transition-all hover:shadow-[#6319F7]/20"
                    >
                        <div className="flex flex-col lg:flex-row">
                            <div className="relative h-64 md:h-80 lg:h-auto lg:w-3/5 overflow-hidden">
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent lg:hidden" />
                            </div>

                            <div className="flex flex-col justify-center p-8 md:p-12 lg:w-2/5 bg-white">
                                <span className="mb-4 inline-block w-fit rounded-full bg-[#6319F7]/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-[#6319F7]">
                                    {news.category}
                                </span>
                                <h3 className="mb-4 text-2xl md:text-3xl font-black leading-tight text-gray-900 group-hover:text-[#6319F7] transition-colors">
                                    {news.title}
                                </h3>
                                <p className="mb-8 text-gray-600 line-clamp-3 text-lg leading-relaxed">
                                    {news.summary}
                                </p>
                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <User size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-900">{news.author}</span>
                                            <span className="text-xs text-gray-500">{news.date}</span>
                                        </div>
                                    </div>
                                    <div className="rounded-full bg-gray-900 p-3 text-white group-hover:bg-[#6319F7] transition-colors">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* GRID DE NOTÍCIAS (Com bordas brancas no Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {sortedData?.slice(1).map(news => (
                    <Link
                        href={`/noticias/${news.slug}/`}
                        key={news.id}
                        className="group flex flex-col h-full bg-white border border-gray-100 p-3 rounded-[2.2rem] shadow-sm hover:shadow-md transition-all md:bg-transparent md:border-none md:p-0 md:shadow-none"
                    >
                        {/* Imagem com borda interna no mobile */}
                        <div className="relative mb-4 h-52 w-full overflow-hidden rounded-[1.8rem] shadow-sm">
                            <Image
                                src={news.image}
                                alt={news.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        <div className="flex flex-1 flex-col px-4 pb-4">
                            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase text-gray-600 truncate">
                                <span className="text-[#6319F7]">{news.category}</span>
                                <span>•</span>
                                <span className="truncate">{news.date}</span>
                            </div>
                            <h3 className="mb-3 text-lg font-black leading-snug text-gray-900 group-hover:text-[#6319F7] transition-colors line-clamp-2">
                                {news.title}
                            </h3>
                            <p className="mb-4 line-clamp-2 text-md leading-relaxed text-gray-600">
                                {news.summary}
                            </p>
                            <div className="mt-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#6319F7]">
                                Ver notícia <ChevronRight size={12} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            {/* Call to Action (Opcional) */}
            <div className="mt-24 rounded-[3rem] bg-gray-900 p-12 text-center text-white">
                <h3 className="mb-4 text-3xl font-black">Quer ver os dados reais?</h3>
                <p className="mb-8 text-gray-400">Compare especificações técnicas e preços no nosso comparador exclusivo.</p>
                <Link
                    href="/comparar"
                    className="inline-block rounded-full bg-[#6319F7] px-10 py-4 font-black uppercase tracking-widest hover:bg-[#5214ce] transition-all"
                >
                    Acessar Comparador
                </Link>
            </div>
        </div >
    );
};