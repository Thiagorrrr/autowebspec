"use client "
import { Calendar, Clock, User } from "lucide-react";
import { BackButton } from "../BackButton";
import { Card } from "../Card";
import { useRouter } from "next/navigation";
import { Key, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script"; // 1. Importe o componente Script
import { useNews } from "@/hooks/queries/useNews";
import { Loading } from "./loading";

export const NewsDetail: React.FC<{ newsSlug: string }> = ({ newsSlug }) => {
    const { data, isLoading, error } = useNews();
    const router = useRouter()

    const news = useMemo(() => data?.find(n => n.slug === newsSlug), [data, newsSlug]);
    const canonicalUrl = `https://autowebspec.com.br/noticias/${newsSlug}/`;
    const newsSchema = useMemo(() => {
        if (!news) return null;

        return {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": news.title,
            "description": news.summary || news.title,
            "image": [news.image],
            "datePublished": news.date,
            "author": [{
                "@type": "Person",
                "name": news.author || "Equipe AutoWebSpec",
                "jobTitle": news.authorRole || "Editor"
            }],
            "publisher": {
                "@type": "Organization",
                "name": "AutoWebSpec",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://autowebspec.com.br/logo.png"
                }
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://autowebspec.com.br/noticias/${news.slug}`
            }
        };
    }, [news]);

    if (isLoading) return <Loading />
    if (error) return <p className="text-center py-10">Erro ao carregar</p>;
    if (!news) {
        return <div className="text-red-500 p-4">Notícia não encontrada.</div>;
    }

    return (
        <div className="space-y-6 animate-fadeIn mt-8">
            {/* 2. Injeção usando o componente Script do Next.js com estratégia correta */}
            <link rel="canonical" href={canonicalUrl} />
            {newsSchema && (
                <Script
                    id={`news-schema-${news.slug}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
                />
            )}

            <BackButton onClick={() => router.back()} label="Voltar para Notícias" />

            {/* ... restante do seu código JSX (Card, Image, Conteúdo, etc) ... */}
            <Card className="overflow-hidden p-0">
                <Image
                    src={news.image}
                    alt={news.title}
                    width={1200}
                    height={675}
                    className="w-full h-64 md:h-96 object-cover"
                    priority
                />
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

                    <div className="prose prose-lg text-gray-700 max-w-none space-y-6 text-lg leading-relaxed">
                        {news.content.split('\n\n').map((paragraph: string, idx: Key | null | undefined) => {
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
                            }
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                                <p key={idx}>
                                    {parts.map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**')
                                            ? <strong key={i} className="text-gray-900">{part.slice(2, -2)}</strong>
                                            : part
                                    )}
                                </p>
                            );
                        })}
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{news.author}</p>
                                <p className="text-sm text-gray-500">{news.authorRole}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Leia Também */}
            <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Leia Também</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.filter(n => n.id !== news.id).slice(0, 3).map(related => (
                        <Link className="group cursor-pointer" href={`/noticias/${related.slug}`} key={related.slug}>
                            <div className="flex flex-col h-full">
                                <div className="overflow-hidden rounded-lg mb-3 h-52">
                                    <Image
                                        src={related.image}
                                        alt={related.title}
                                        width={400}
                                        height={225}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
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