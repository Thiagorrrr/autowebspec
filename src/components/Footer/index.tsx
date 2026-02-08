"use client"

import { Flame } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-linear-to-b from-gray-50 to-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* LOGO / MARCA */}
                    <div>
                        <div className="flex  items-center gap-3">
                            <div className="bg-[#6319F7] p-2.5 rounded-xl shadow-lg shadow-[#6319F7]/30 transform -rotate-3">
                                <Flame className="text-white" size={18} fill="currentColor" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black tracking-tighter text-gray-900">
                                    AUTO<span className="text-[#6319F7]">WEBSPEC</span>
                                </h2>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                                    Comparador Pro
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500 max-w-sm">
                            Plataforma inteligente para comparar carros, analisar rankings
                            e tomar decisões mais seguras no mercado automotivo.
                        </p>
                    </div>

                    {/* NAVEGAÇÃO */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                            Navegação
                        </h3>

                        <ul className="space-y-2 text-sm text-gray-500 font-medium">
                            <li><Link href="/" className="hover:text-[#6319F7]">Home</Link></li>
                            <li><Link href="/comparar" className="hover:text-[#6319F7]">Comparar</Link></li>
                            <li><Link href="/produtos" className="hover:text-[#6319F7]">Produtos</Link></li>
                            <li><Link href="/ranking" className="hover:text-[#6319F7]">Ranking</Link></li>
                            <li><Link href="/noticias" className="hover:text-[#6319F7]">Notícias</Link></li>
                            <li><Link href="/marcas" className="hover:text-[#6319F7]">Marcas</Link></li>
                        </ul>
                    </div>

                    {/* INFORMAÇÕES */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                            Informações
                        </h3>

                        <ul className="space-y-2 text-sm text-gray-500 font-medium">
                            <li><Link href="/detalhes" className="hover:text-[#6319F7]">Detalhes</Link></li>
                            <li><Link href="/custos" className="hover:text-[#6319F7]">Custos</Link></li>
                            <li><Link href="/eventos" className="hover:text-[#6319F7]">Eventos</Link></li>
                            <li><Link href="/politica-de-privacidade" className="hover:text-[#6319F7]">Politica de privacidade</Link></li>
                            <li><Link href="/termos-de-uso" className="hover:text-[#6319F7]">Termos de uso</Link></li>
                            <li><Link href="/sobre-nos" className="hover:text-[#6319F7]">Sobre Nós</Link></li>
                            <li><Link href="/contato" className="hover:text-[#6319F7]">Contato</Link></li>
                        </ul>
                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="mt-12 border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} AutoWebSpec. Todos os direitos reservados.
                    </p>

                    <p className="text-sm text-gray-400">
                        Feito com foco em dados, clareza e performance.
                    </p>
                </div>

            </div>
        </footer>
    );
};
