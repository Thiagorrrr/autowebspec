import { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { Scale, AlertTriangle, FileCheck, Ban } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Termos de Uso | AutoWebSpec",
    description: "Regras e condições para utilização do portal autowebspec.com.br, comparativos de veículos e informações sobre o setor automotivo."
};

export default function TermsOfUse() {
    const lastUpdate = "08 de Fevereiro de 2026";

    const terms = [
        {
            icon: <FileCheck className="text-[#6319F7]" size={24} />,
            title: "Aceitação de Termos",
            content: "Ao acessar o autowebspec.com.br, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis."
        },
        {
            icon: <Scale className="text-[#6319F7]" size={24} />,
            title: "Uso de Licença",
            content: "É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site apenas para visualização transitória pessoal e não comercial."
        },
        {
            icon: <AlertTriangle className="text-[#6319F7]" size={24} />,
            title: "Isenção de Responsabilidade",
            content: "Os materiais no site são fornecidos 'como estão'. Não oferecemos garantias de precisão absoluta, especialmente em preços que podem variar conforme a região ou concessionária."
        },
        {
            icon: <Ban className="text-[#6319F7]" size={24} />,
            title: "Limitações",
            content: "Em nenhum caso o AutoWebSpec ou seus fornecedores serão responsáveis por danos decorrentes do uso ou da incapacidade de usar os materiais contidos no site."
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
            {/* Header */}
            <header className="text-center space-y-4">
                <SectionTitle>Termos de Uso</SectionTitle>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Estes termos regem o uso do
                    <span className="font-bold text-gray-900"> autowebspec.com.br </span>
                    e seus subdomínios.
                </p>
                <p className="text-xs font-medium text-[#6319F7] uppercase tracking-widest">
                    Última atualização: {lastUpdate}
                </p>
            </header>

            {/* Grid de Regras */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {terms.map((item, index) => (
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

            {/* Seção Explicativa Estilo Ranking */}
            <section className="bg-gray-50 -mx-4 px-4 py-12 md:mx-0 md:rounded-4xl space-y-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">Propriedade Intelectual</h2>

                    <div className="prose prose-slate max-w-none text-gray-600 space-y-4">
                        <p>
                            Todo o conteúdo presente no <strong>AutoWebSpec</strong>, incluindo textos, gráficos, logotipos, ícones de botões e imagens (como os utilizados nos comparativos de Polo, Corolla e HB20), é de nossa propriedade ou de nossos fornecedores de conteúdo e está protegido por leis de direitos autorais.
                        </p>
                        <p>
                            A modificação ou uso dos materiais para qualquer outro propósito que não seja o de consulta pessoal viola os direitos autorais e de propriedade.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-[#6319F7] mb-2 flex items-center gap-2">
                            <FileCheck size={18} /> Precisão dos Dados
                        </h4>
                        <p className="text-sm text-gray-500">
                            Embora nos esforcemos para manter os dados técnicos dos veículos atualizados (como as versões 2025 e 2026 citadas em nossos comparativos), as fabricantes podem alterar especificações sem aviso prévio. Recomendamos sempre confirmar os dados com uma concessionária oficial.
                        </p>
                    </div>
                </div>
            </section>

            {/* Rodapé da Página de Termos */}
            <footer className="text-center pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-400">
                    O uso continuado do nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                    <Link href="/politica-de-privacidade" className="text-xs font-bold text-gray-500 hover:text-[#6319F7] transition-colors">
                        Política de Privacidade
                    </Link>
                    <span className="text-gray-200">|</span>
                    <Link href="/contato" className="text-xs font-bold text-gray-500 hover:text-[#6319F7] transition-colors">
                        Suporte técnico
                    </Link>
                </div>
            </footer>
        </div>
    );
}