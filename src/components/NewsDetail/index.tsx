"use client "
import { Calendar, Clock, User } from "lucide-react";
import { BackButton } from "../BackButton";
import { Card } from "../Card";
import { useRouter } from "next/navigation";
import { Key } from "react";
import { dataNews } from "../Main/data";
import Link from "next/link";

export const NewsDetail: React.FC<{ newsSlug: string }> = ({ newsSlug }) => {
    const NEWS_DATA = dataNews();
    const news = NEWS_DATA.find(n => n.slug === newsSlug);
    const router = useRouter()

    if (!news) {
        return <div className="text-red-500 p-4">Notícia não encontrada.</div>;
    }
    return (
        <div className="space-y-6 animate-fadeIn">
            <BackButton onClick={() => router.back()} label="Voltar para Notícias" />

            <Card className="overflow-hidden p-0">
                <img src={news.image} alt={news.title} className="w-full h-64 md:h-96 object-cover" />
                <div className="p-6 md:p-10">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-[#6319F7]/10 text-[#6319F7] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{news.category}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar size={14} /> {news.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={14} /> {news.readTime}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">{news.title}</h1>

                    {/* Estilo para simular texto rico e formatação */}
                    <div className="prose prose-lg text-gray-700 max-w-none space-y-6 text-lg leading-relaxed">
                        {news.content.split('\n\n').map((paragraph: string, idx: Key | null | undefined) => {
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
                            }
                            // Detecta negrito simples (**texto**)
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                                <p key={idx}>
                                    {parts.map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**')
                                            ? <strong key={i}>{part.slice(2, -2)}</strong>
                                            : part
                                    )}
                                </p>
                            );
                        })}
                    </div>

                    {/* Author Box */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{news.author}</p>
                                <p className="text-sm text-gray-500">{news.authorRole}</p>
                            </div>
                            {/* <div className="ml-auto flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-[#6319F7] transition-colors"><Share2 size={20} /></button>
                                <button className="p-2 text-gray-400 hover:text-[#6319F7] transition-colors"><Bookmark size={20} /></button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Related News (Simples, pegando outras notícias) */}
            <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Leia Também</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NEWS_DATA.filter(n => n.id !== news.id).slice(0, 3).map(related => (

                        <Link className="group cursor-pointer" href={`/noticias/${related.slug}`} key={related.slug}>

                            <div key={related.id} >
                                <div className="overflow-hidden rounded-lg mb-3">
                                    <img src={related.image} alt={related.title} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <h4 className="font-bold text-gray-900 group-hover:text-[#6319F7] transition-colors line-clamp-2">{related.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{related.date}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};