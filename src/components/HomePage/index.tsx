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

export const HomePage = () => {
    const pathname = usePathname();
    const { data, isLoading, error } = useNews();

    const dataDestaque = [
        {
            id: "1",
            title: "Corolla vs Sentra",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/toyota/corolla/corolla.webp",
                car2: "/marcas/nissan/sentra/sentra.webp",
            },
            url: "comparar/?carro1=toyota-corolla-2025&carro2=nissan-sentra-2025",
        },
        {
            id: "2",
            title: "Polo vs 208",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/volkswagen/polo/polo.webp",
                car2: "/marcas/peugeot/208/208.webp",
            },
            url: "comparar/?carro1=volkswagen-polo-2025&carro2=peugeot-208-2025",
        },
        {
            id: "3",
            title: "HB20 vs 208",
            subtitle: "Compare especificações técnicas e desempenho lado a lado.",
            image: {
                car1: "/marcas/hyundai/hb20/hb20.webp",
                car2: "/marcas/peugeot/208/208.webp",
            },
            url: "comparar/?carro1=hyundai-hb20-2025&carro2=peugeot-208-2025",
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
            {/* ================= COMPARATIVOS ================= */}
            <section className="space-y-6">
                <SectionTitle>Comparativos em Destaque</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataDestaque.map((news) => (
                        <Link
                            key={news.id}
                            href={`${pathname}${news.url}`}
                            className="group"
                        >
                            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="relative flex items-center justify-center h-48 bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-36 aspect-square">
                                            <Image
                                                src={news.image.car1}
                                                alt={news.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        <span className="text-[#6319F7] font-extrabold text-xl">
                                            VS
                                        </span>

                                        <div className="relative w-36 aspect-square">
                                            <Image
                                                src={news.image.car2}
                                                alt={news.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                                        {news.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 flex-1">
                                        {news.subtitle}
                                    </p>

                                    <div className="mt-4">
                                        <Button fullWidth primary>
                                            Comparar
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ================= RANKING ================= */}
            <section className="space-y-6">
                <SectionTitle>Ranking por preço</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dataRanking.map((item) => (
                        <Link key={item.id} href={`${pathname}${item.url}`} className="group">
                            <Card className="relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                {/* Badge posição */}
                                <div className="absolute top-3 left-3 z-10">
                                    <span
                                        className={`
                      flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-sm
                      ${item.position === 1
                                                ? "bg-linear-to-r from-yellow-400 to-yellow-300 text-black"
                                                : item.position === 2
                                                    ? "bg-linear-to-r from-gray-300 to-gray-200 text-gray-900"
                                                    : "bg-linear-to-r from-orange-300 to-orange-200 text-gray-900"}
                    `}
                                    >
                                        {item.position === 1 && "🏆"}
                                        {item.position === 2 && "🥈"}
                                        {item.position === 3 && "🥉"}
                                        {item.position}º lugar
                                    </span>
                                </div>

                                {/* Categoria */}
                                <div className="absolute top-3 right-3 z-10">
                                    <span className="text-xs font-medium text-white bg-[#5014c9] px-2 py-1 rounded">
                                        Hatch
                                    </span>
                                </div>

                                {/* Imagem */}
                                <div className="relative flex items-center justify-center h-44 bg-gray-50">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Conteúdo */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-semibold text-base text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Ranking de preço
                                    </p>

                                    <div className="mt-auto pt-4">
                                        <Button fullWidth primary>
                                            Ver detalhes
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ================= NOTÍCIAS ================= */}
            <section className="space-y-6">
                <SectionTitle>Últimas Notícias</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.slice(0, 3).map((news) => (
                        <Link
                            key={news.id}
                            href={`${pathname}${news.slug}`}
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
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                                        {news.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 line-clamp-3 flex-1">
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
