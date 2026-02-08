import { SectionTitle } from "@/components/SectionTitle";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Mail, MessageSquare, Clock, ChevronRight, Send } from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
    const email = "autowebspec@gmail.com";
    const contactB2B = false
    const contactMethods = [
        {
            icon: <Mail className="text-[#6319F7]" size={24} />,
            title: "E-mail Geral",
            description: "Dúvidas, sugestões ou parcerias.",
            value: email,
            action: `mailto:${email}`
        },
        {
            icon: <MessageSquare className="text-[#6319F7]" size={24} />,
            title: "Suporte Técnico",
            description: "Relate problemas no site ou comparativos.",
            value: "Enviar Ticket",
            action: `mailto:${email}?subject=Suporte Técnico`
        },
        {
            icon: <Clock className="text-[#6319F7]" size={24} />,
            title: "Atendimento",
            description: "Tempo médio de resposta",
            value: "Até 48 horas úteis",
            action: "#"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
            {/* Header com estilo SectionTitle */}
            <header className="text-center space-y-4">
                <div className="inline-block px-4 py-1.5 bg-[#6319F7]/10 text-[#6319F7] rounded-full text-xs font-black uppercase tracking-widest mb-4">
                    Estamos aqui por você
                </div>
                <SectionTitle>Fale com o AutoWebSpec</SectionTitle>
                <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
                    Tem sugestões de melhoria para nossos comparativos ou encontrou alguma divergência técnica? Nossa equipe está pronta para te ouvir.
                </p>
            </header>

            {/* Grid de Contatos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactMethods.map((method, index) => (
                    <Card key={index} className="p-8 text-center border-none shadow-sm bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#6319F7]/5 transition-colors">
                            {method.icon}
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{method.title}</h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            {method.description}
                        </p>

                        {method.action !== "#" ? (
                            <Link
                                href={method.action}
                                className="inline-flex items-center gap-2 text-[#6319F7] font-bold text-sm hover:gap-3 transition-all break-all"
                            >
                                {method.value} <ChevronRight size={16} />
                            </Link>
                        ) : (
                            <span className="text-gray-900 font-bold text-sm">{method.value}</span>
                        )}
                    </Card>
                ))}
            </div>

            {
                contactB2B && <section className="bg-gray-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left">
                    {/* Efeito de luz no fundo */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#6319F7] opacity-20 blur-[120px]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                                Anuncie no maior <br /> <span className="text-[#6319F7]">comparador técnico.</span>
                            </h2>
                            <p className="text-gray-400 max-w-md">
                                Sua marca em destaque para quem está no momento decisivo da compra de um novo veículo.
                            </p>
                        </div>

                        <Link href={`mailto:${email}?subject=Anunciar no AutoWebSpec`}>
                            <Button className="h-16 px-12 text-lg font-bold bg-[#6319F7] hover:bg-[#5214d4] rounded-2xl shadow-2xl shadow-[#6319F7]/30 flex items-center gap-3">
                                <Send size={20} /> Entrar em Contato
                            </Button>
                        </Link>
                    </div>
                </section>
            }


        </div>
    );
}
export default ContactPage