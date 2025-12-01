
"use client"
import { ChevronRight, Newspaper } from "lucide-react";
import { Card } from "../Card";
import { SectionTitle } from "../SectionTitle";
import { NewsArticle } from "../Main/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const NewsList = ({ data }: { data: NewsArticle[] }) => {
    const pathname = usePathname();

    return (
        <div className="space-y-6">
            <SectionTitle>
                <Newspaper size={20} className="text-[#6319F7]" /> Últimas Notícias
            </SectionTitle>

            {/* Destaque */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {data.slice(0, 1).map(news => (
                    <Link className="col-span-1 md:col-span-2 p-0 overflow-hidden cursor-pointer group" href={`${pathname}/${news.slug}`} key={news.id}>

                        <Card key={news.id} >
                            <div className="relative h-64 md:h-80 w-full">
                                <Image src={news.image} alt={news.title} width={100} height={150} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
                {data.slice(1).map(news => (
                    <Link className="p-0 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow" href={`${pathname}${news.slug}`} key={news.id}>

                        <Card key={news.id} >
                            <div className="h-48 w-full overflow-hidden relative">
                                <Image src={news.image} alt={news.title} width={100} height={150} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">{news.category}</span>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">{news.summary}</p>
                                <div className="flex justify-between items-center text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
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