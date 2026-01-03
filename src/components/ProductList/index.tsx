"use client";

import { ExternalLink, Star, ShieldCheck, TrendingUp } from "lucide-react";
import { Card } from "../Card";
import { SectionTitle } from "../SectionTitle";
import Image from "next/image";

export type Product = {
    id: string;
    slug: string;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    category: string;
    summary: string;
    affiliateUrl: string;
};

export const data: Product[] = [
    {
        id: "1",
        slug: "kit-lavagem-automotiva-v-floc-blend-sintra-intense-vonixx",
        title: "Kit Lavagem Automotiva V-floc Blend Sintra Intense Vonixx",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_826294-MLB100079046040_122025-F.webp",
        price: 148.99,
        oldPrice: 196.46,
        category: "Limpeza automotiva",
        summary:
            "Kit Lavagem Automotiva V-floc Blend Sintra Intense Vonixx",
        affiliateUrl: "https://mercadolivre.com/sec/1ocaPNb",
    },
    {
        id: "2",
        slug: "modulo-taramps",
        title: "Modulo Taramps Ts400x4 Potencia de 400watts 2 Ohms Amplificador 400rms T400 4 Canais Som Automotivo 2 Ohms Rca Ts 400x4 Crossover",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_711919-MLA99446273578_112025-F.webp",
        price: 160,
        oldPrice: 199,
        category: "Audio",
        summary:
            "O módulo amplificador digital TS 400x4 2 ohms da Taramps foi desenvolvido com a mais alta performance para os mais variados tipos de sistemas de som automotivo. ",
        affiliateUrl: "https://mercadolivre.com/sec/21AGVhZ",
    },
    {
        id: "3",
        slug: "aspirador-automotivo-portátil",
        title: "Aspirador Automotivo Portátil WAP CAR com Filtro HEPA e Cabo de 3,7m",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_602698-MLU75357931105_032024-F.webp",
        price: 99.0,
        oldPrice: 139,
        category: "Acessórios",
        summary:
            "O Aspirador de Pó WAP CAR 12V2 é a solução prática para manter seu carro limpo.",
        affiliateUrl: "https://mercadolivre.com/sec/1FVghHV",
    },
    {
        id: "4",
        slug: "cadeirinha-infantil-reclinavel-legacy-cinza-e-preto-mescla-voyage",
        title: "Cadeirinha Infantil Reclinável Legacy Cinza e Preto Mescla Voyage",
        image: "https://http2.mlstatic.com/D_NQ_NP_2X_856035-MLA99488954664_112025-F.webp",
        price: 616.82,
        oldPrice: 989.90,
        category: "Passeio do Bebê",
        summary:
            "A Cadeirinha Legacy da Voyage vai transportar seu filho em todas as fases do crescimento.",
        affiliateUrl: "https://mercadolivre.com/sec/2uvKhuf",
    },
];

export const ProductList = () => {
    const featuredProduct = data[0];

    return (
        <div className="space-y-12 mt-8">
            <SectionTitle>Produtos</SectionTitle>

            {/* 🔥 DESTAQUE */}
            <div className="bg-linear-to-r from-[#6319F7]/10 to-transparent rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-1/2 h-64 rounded-xl overflow-hidden">
                    <Image
                        src={featuredProduct.image}
                        alt={featuredProduct.title}
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-[#6319F7]">
                        <TrendingUp size={14} /> PRODUTO RECOMENDADO
                    </span>

                    <h2 className="text-2xl font-bold text-gray-900">
                        {featuredProduct.title}
                    </h2>

                    <p className="text-gray-600">{featuredProduct.summary}</p>

                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">
                            <Star size={14} className="text-[#6319F7]" />
                            Excelente avaliação dos compradores
                        </li>
                        <li className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-[#6319F7]" />
                            Compra segura via Mercado Livre
                        </li>
                        <li className="flex items-center gap-2">
                            <TrendingUp size={14} className="text-[#6319F7]" />
                            Alto custo-benefício segundo testes
                        </li>
                    </ul>

                    <div className="flex items-center gap-6 pt-4">
                        <div>
                            {featuredProduct.oldPrice && (
                                <span className="text-sm line-through text-gray-400">
                                    R$ {featuredProduct.oldPrice}
                                </span>
                            )}
                            <p className="text-3xl font-bold text-[#6319F7]">
                                R$ {featuredProduct.price}
                            </p>
                        </div>

                        <a
                            href={featuredProduct.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#6319F7] text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                        >
                            Comprar agora
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* 🧱 GRID DE PRODUTOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.slice(1).map(product => (
                    <Card
                        key={product.id}
                        className="overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
                    >
                        <div className="h-48 w-full relative overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {product.category}
                            </span>
                        </div>

                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                                {product.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-3 mt-2 flex-1">
                                {product.summary}
                            </p>

                            <div className="mt-4">
                                {product.oldPrice && (
                                    <span className="text-sm line-through text-gray-400">
                                        R$ {product.oldPrice}
                                    </span>
                                )}
                                <p className="text-xl font-bold text-[#6319F7]">
                                    R$ {product.price}
                                </p>
                            </div>

                            <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 flex items-center justify-center gap-2 bg-[#6319F7] text-white py-2 rounded-md hover:opacity-90 transition"
                            >
                                Comprar no Mercado Livre
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
