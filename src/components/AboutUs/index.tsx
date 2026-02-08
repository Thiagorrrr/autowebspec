import { Metadata } from "next";
import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Target, Zap, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Quem Somos | AutoWebSpec",
    description: "Conheça a história e o propósito do autowebspec.com.br, sua plataforma de comparação técnica e análise detalhada de veículos."
};

export default function AboutUs() {
    const values = [
        {
            icon: <Zap className="text-yellow-500" size={24} />,
            title: "Agilidade",
            content: "Informações técnicas precisas entregues de forma rápida e intuitiva."
        },
        {
            icon: <Target className="text-[#6319F7]" size={24} />,
            title: "Precisão",
            content: "Dados colhidos diretamente de fichas técnicas oficiais e testes reais."
        },
        {
            icon: <ShieldCheck className="text-green-500" size={24} />,
            title: "Isenção",
            content: "Nossas comparações são baseadas em fatos e números, sem viés comercial."
        },
        {
            icon: <Users className="text-blue-500" size={24} />,
            title: "Comunidade",
            content: "Feito por entusiastas de carros para quem busca a melhor escolha."
        }
    ];

    return (
        <div className="space-y-20 pb-20">
            {/* Hero Section - Estilo Header da Home */}
            <section className="relative bg-gray-900 text-white py-24 -mx-4 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-radial-at-t from-[#6319F7]/40 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <span className="text-[#6319F7] font-black uppercase tracking-[0.3em] text-xs">
                        Sobre o AutoWebSpec
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Transformando dados técnicos em <span className="text-[#6319F7]">decisões inteligentes.</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Nascemos da necessidade de simplificar a comparação entre veículos no Brasil, trazendo clareza para quem busca o carro ideal.
                    </p>
                </div>
            </section>

            {/* Nossa História */}
            <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <SectionTitle>Nossa Missão</SectionTitle>
                    <div className="prose prose-slate text-gray-600 space-y-4 text-lg">
                        <p>
                            O <strong>autowebspec.com.br</strong> surgiu para preencher uma lacuna no setor automotivo digital: a falta de uma ferramenta de comparação puramente técnica e performática.
                        </p>
                        <p>
                            Seja comparando um <strong>Corolla vs Sentra</strong> ou analisando o custo-benefício de um <strong>Mobi</strong> no ranking nacional, nossa plataforma processa milhares de dados para entregar a você o que realmente importa: a especificação real.
                        </p>
                    </div>
                </div>
                <div className="relative h-80 lg:h-[450px] rounded-4xl overflow-hidden shadow-2xl rotate-2 group hover:rotate-0 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#6319F7]/10 z-10" />
                    <Image
                        src="/marcas/volkswagen/polo/polo.webp" // Exemplo de imagem que você já tem no projeto
                        alt="Background Tech"
                        fill
                        className="object-cover scale-125 group-hover:scale-100 transition-transform duration-700"
                    />
                </div>
            </section>

            {/* Valores - Grid de Cards */}
            <section className="bg-gray-50 -mx-4 px-4 py-20 md:rounded-[4rem]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <SectionTitle>O que nos move</SectionTitle>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="p-8 border-none bg-white hover:-translate-y-2 transition-all duration-300">
                                <div className="mb-6 inline-block p-4 bg-gray-50 rounded-2xl">
                                    {value.icon}
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {value.content}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="max-w-4xl mx-auto px-4 text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6319F7]/10 text-[#6319F7] font-bold text-xs uppercase tracking-widest">
                    Pronto para começar?
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Encontre seu próximo carro agora mesmo.</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/comparar">
                        <Button className="px-10 h-14 text-lg shadow-xl shadow-[#6319F7]/20">
                            Ver Comparativos
                        </Button>
                    </Link>
                    <Link href="/ranking">
                        <Button className="px-10 h-14 text-lg border-2">
                            Explorar Rankings
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}