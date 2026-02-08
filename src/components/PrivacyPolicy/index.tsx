"use client";

import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { ChevronRight, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
    const lastUpdate = "08 de Fevereiro de 2026";

    const sections = [
        {
            icon: <Eye className="text-[#6319F7]" size={24} />,
            title: "Coleta de Informações",
            content: "Coletamos informações que você nos fornece diretamente ao utilizar o autowebspec.com.br, como buscas de veículos e interações com comparativos. Também podemos coletar dados técnicos automaticamente, como endereço IP e tipo de navegador."
        },
        {
            icon: <ShieldCheck className="text-[#6319F7]" size={24} />,
            title: "Uso dos Dados",
            content: "Seus dados são utilizados para personalizar sua experiência, melhorar nossos algoritmos de comparação de veículos e enviar comunicações caso você se inscreva em nossa newsletter."
        },
        {
            icon: <Lock className="text-[#6319F7]" size={24} />,
            title: "Segurança",
            content: "Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado ou perda acidental."
        },
        {
            icon: <FileText className="text-[#6319F7]" size={24} />,
            title: "Seus Direitos",
            content: "De acordo com a LGPD, você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através dos nossos canais de atendimento."
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
            {/* Header */}
            <header className="text-center space-y-4">
                <SectionTitle>Política de Privacidade</SectionTitle>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Sua privacidade é importante para nós. Esta política explica como o
                    <span className="font-bold text-gray-900"> autowebspec.com.br </span>
                    trata seus dados.
                </p>
                <p className="text-xs font-medium text-[#6319F7] uppercase tracking-widest">
                    Última atualização: {lastUpdate}
                </p>
            </header>

            {/* Grid de Tópicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((item, index) => (
                    <Card key={index} className="p-6 border-none shadow-sm bg-white hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <section className="bg-gray-50 rounded-4xl p-8 md:p-12 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Detalhes Adicionais</h2>

                <article className="prose prose-slate max-w-none text-gray-600 space-y-4">
                    <p>
                        O <strong>AutoWebSpec</strong> utiliza cookies para melhorar a navegação e entender como os usuários interagem com nossos comparativos de carros (como o Corolla vs Sentra). Esses dados são anônimos e focados em usabilidade.
                    </p>
                    <p>
                        Não compartilhamos suas informações pessoais com terceiros para fins de marketing sem o seu consentimento explícito. Links para sites externos (como concessionárias ou fabricantes) possuem suas próprias políticas de privacidade, pelas quais não nos responsabilizamos.
                    </p>
                </article>

                <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Dúvidas?</h4>
                    <p className="text-sm text-gray-500 mb-4">
                        Se tiver qualquer pergunta sobre como lidamos com seus dados, entre em contato conosco.
                    </p>
                    <Link href="/contato">
                        <span className="inline-flex items-center gap-2 text-[#6319F7] font-bold hover:underline">
                            Falar com o suporte <ChevronRight size={16} />
                        </span>
                    </Link>
                </div>
            </section>
        </div>
    );
}