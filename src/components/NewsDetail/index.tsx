"use client"
import { Calendar, Clock, User, ChevronLeft, Share2, Award, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useNews } from "@/hooks/queries/useNews";
import { Loading } from "./loading";
import { BackButton } from "@/components/BackButton";
import { AlertMessage } from "../DragRace";
import { Alert } from "@/components/Alert"

export const NewsDetail: React.FC<{ newsSlug: string }> = ({ newsSlug }) => {
    const { data, isLoading, error } = useNews();
    const router = useRouter();
    const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

    const news = useMemo(() => data?.find(n => n.slug === newsSlug), [data, newsSlug]);
    const canonicalUrl = `https://autowebspec.com.br/noticias/${newsSlug}/`;
    const copiarLink = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => setAlertMessage({ type: "success", message: "Link da notícia copiado!" }))
            .catch(() => setAlertMessage({ type: "error", message: "Erro ao copiar link" }));
    };
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
                "jobTitle": news.authorRole || "Editor Especialista"
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

    if (isLoading) return <Loading />;
    if (error) return <p className="text-center py-10 font-medium text-gray-500">Erro ao carregar conteúdo.</p>;
    if (!news) return <div className="text-red-500 p-8 text-center bg-red-50 rounded-xl mt-8">Notícia não encontrada.</div>;

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 animate-fadeIn mt-8 pb-24">
            {/* SEO & Meta */}
            <link rel="canonical" href={canonicalUrl} />
            {newsSchema && (
                <Script
                    id={`news-schema-${news.slug}`}
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
                />
            )}

            {/* Top Bar Navigation */}
            <div className="flex justify-between items-center mb-10">
                <BackButton onClick={() => router.push('/noticias')} label="Todas as Notícias" />
                <div className="flex gap-2">
                    <button className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-[#6319F7] cursor-pointer" title="Compartilhar" onClick={copiarLink}>
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <article>
                {/* Header Section - Agora mais largo no Desktop */}
                <header className="mb-12 text-left md:text-center max-w-5xl mx-auto">
                    <div className="flex flex-col md:items-center">
                        <span className="inline-block bg-[#6319F7] text-white text-sm font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 shadow-md self-start md:self-center">
                            {news.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-[1.05] tracking-tight">
                            {news.title}
                        </h1>
                        <div className="flex flex-wrap items-center md:justify-center gap-y-4 gap-x-8 text-sm md:text-base text-gray-600 font-semibold border-y border-gray-100 py-6 w-full">
                            <div className="flex items-center gap-2"><Calendar size={18} className="text-[#6319F7]" /> {news.date}</div>
                            <div className="flex items-center gap-2"><Clock size={18} className="text-[#6319F7]" /> {news.readTime} de leitura</div>
                            <div className="flex items-center gap-2 text-gray-900"><User size={18} className="text-[#6319F7]" /> {news.author}</div>
                        </div>
                    </div>
                </header>

                {/* Main Visual */}
                <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Layout - Controlado para legibilidade premium */}
                <div className="max-w-6xl mx-auto">
                    {/* Intro/Summary */}
                    <div className="relative mb-16">
                        <p className="text-2xl md:text-3xl text-gray-700 font-bold leading-snug md:leading-relaxed">
                            {news.summary || "Exploramos os detalhes técnicos, performance e o posicionamento de mercado deste novo modelo."}
                        </p>
                    </div>

                    <div className="prose prose-lg lg:prose-xl prose-slate max-w-none">
                        {news.content.split('\n\n').map((paragraph: string, idx: number) => {

                            // Subtítulos H2
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={idx} className="text-3xl md:text-5xl font-black text-gray-900 mt-16 mb-8 flex items-center gap-4">
                                        <div className="w-2.5 h-10 bg-[#6319F7] rounded-full"></div>
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            }

                            // Veredito/Citação
                            if (paragraph.startsWith('> ')) {
                                return (
                                    <blockquote key={idx} className="bg-slate-900 p-10 md:p-14 my-14 rounded-4xl border-none relative overflow-hidden group">
                                        <Zap className="absolute top-6 right-6 text-[#6319F7] opacity-20 group-hover:opacity-100 transition-opacity" size={60} />
                                        <p className="text-[#6319F7] font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                            <Award size={18} /> Veredito Técnico
                                        </p>
                                        <p className="text-white font-bold text-2xl md:text-3xl leading-relaxed m-0 relative z-10">
                                            "{paragraph.replace('> ', '')}"
                                        </p>
                                    </blockquote>
                                );
                            }

                            // Listas / Ficha Técnica (Grid)
                            if (paragraph.startsWith('- ')) {
                                return (
                                    <div key={idx} className="my-10 bg-white border-2 border-gray-100 rounded-3xl p-8 shadow-sm">
                                        <p className="font-black text-gray-900 mb-6 uppercase text-sm tracking-widest">Especificações em Destaque</p>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                                            {paragraph.split('\n').map((item, i) => (
                                                <li key={i} className="flex flex-col gap-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <span className="text-[#6319F7] font-black text-[10px] uppercase">Destaque</span>
                                                    <span className="text-gray-900 font-bold text-base leading-tight">{item.replace('- ', '')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            }

                            // Parágrafo Padrão
                            const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                            return (
                                <p key={idx} className="text-gray-600 leading-[1.8] text-xl md:text-2xl mb-8">
                                    {parts.map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**')
                                            ? <strong key={i} className="text-gray-950 font-extrabold">{part.slice(2, -2)}</strong>
                                            : part
                                    )}
                                </p>
                            );
                        })}
                    </div>

                    {/* Banner de Conversão Premium */}
                    <div className="mt-20 relative p-12 bg-[#6319F7] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#6319F7]/20">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div className="max-w-md">
                                <h4 className="text-3xl md:text-4xl font-black text-white mb-4">Compare com rivais.</h4>
                                <p className="text-white/80 text-lg font-medium">Não decida apenas pelo visual. Coloque a ficha técnica lado a lado com os concorrentes agora.</p>
                            </div>
                            <Link href="/comparar" className="whitespace-nowrap bg-white text-[#6319F7] font-black px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-xl flex items-center gap-3">
                                ABRIR COMPARADOR <ChevronLeft size={20} className="rotate-180" />
                            </Link>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </article>

            {/* Sugestões de Leitura */}
            <section className="mt-32 pt-20 border-t border-gray-100">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h3 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter">Leia a seguir</h3>
                        <p className="text-gray-500 text-lg font-medium italic">Seleção exclusiva AutoWebSpec para você.</p>
                    </div>
                    <Link href="/noticias" className="inline-flex items-center gap-2 text-[#6319F7] font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                        Ver todo o acervo <ChevronLeft size={16} className="rotate-180" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {data?.filter(n => n.id !== news.id).slice(0, 3).map(related => (
                        <Link className="group" href={`/noticias/${related.slug}`} key={related.slug}>
                            <div className="relative h-64 rounded-4xl overflow-hidden mb-6 shadow-lg">
                                <Image
                                    src={related.image}
                                    alt={related.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur-sm text-[#6319F7] text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                        {related.category}
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-gray-900 group-hover:text-[#6319F7] transition-colors leading-tight mb-3">
                                {related.title}
                            </h4>
                            <p className="text-sm text-gray-600 font-bold uppercase tracking-widest">{related.date}</p>
                        </Link>
                    ))}
                </div>
            </section>
            {alertMessage && <Alert type={alertMessage.type} message={alertMessage.message} onClose={() => setAlertMessage(null)} />}

        </div>
    );
};