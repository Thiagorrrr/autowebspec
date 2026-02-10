"use client"

import { Flame } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-linear-to-b from-gray-50 to-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* LOGO / MARCA */}
                    <div>
                        <div className="flex  items-center gap-3">
                            <div className="bg-[#6319F7] p-2.5 rounded-xl shadow-lg shadow-[#6319F7]/30 transform -rotate-3">
                                <Flame className="text-white" size={18} fill="currentColor" />
                            </div>
                            <div>
                                <span className="text-xl font-black tracking-tighter text-gray-900">
                                    AUTO<span className="text-[#6319F7]">WEBSPEC</span>
                                </span>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">
                                    Comparador Pro
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-lg text-gray-600 max-w-sm">
                            Plataforma inteligente para comparar carros, analisar rankings
                            e tomar decisões mais seguras no mercado automotivo.
                        </p>
                    </div>

                    {/* NAVEGAÇÃO */}
                    <div className="grid grid-cols-2 ">

                        <nav aria-labelledby="footer-main-nav">
                            <span id="footer-main-nav" className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider">
                                Navegação
                            </span>

                            <ul className="flex flex-col text-lg text-gray-600 font-medium">
                                <li>
                                    <Link
                                        href="/"
                                        className="flex items-center w-full py-3 hover:text-[#6319F7] transition-all duration-200"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/comparar"
                                        className="flex items-center w-full py-3 hover:text-[#6319F7] transition-all duration-200"
                                    >
                                        Comparar
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/produtos"
                                        className="flex items-center w-full py-3 hover:text-[#6319F7] transition-all duration-200"
                                    >
                                        Produtos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/ranking"
                                        className="flex items-center w-full py-3 hover:text-[#6319F7] transition-all duration-200"
                                    >
                                        Ranking
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/noticias"
                                        className="flex items-center w-full py-3 hover:text-[#6319F7] transition-all duration-200"
                                    >
                                        Notícias
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/marcas"
                                        className="flex items-center w-full py-3 hover:text-[#6319F7] transition-all duration-200"
                                    >
                                        Marcas
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* INFORMAÇÕES */}
                        <nav aria-labelledby="footer-info-nav">

                            <span id="footer-info-nav" className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider">
                                Informações
                            </span>

                            <ul className="flex flex-col text-lg text-gray-600 font-medium">
                                <li>
                                    <Link
                                        href="/detalhes"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Detalhes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/custos"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Custos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/eventos"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Eventos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/politica-de-privacidade"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Política de privacidade
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/termos-de-uso"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Termos de uso
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/sobre-nos"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Sobre Nós
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contato"
                                        className="flex items-center py-3 hover:text-[#6319F7] transition-colors"
                                    >
                                        Contato
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="mt-12 border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-md text-gray-600">
                        © {new Date().getFullYear()} AutoWebSpec. Todos os direitos reservados.
                    </p>

                    <p className="text-lg text-gray-600">
                        Feito com foco em dados, clareza e performance.
                    </p>
                </div>

            </div>
        </footer>
    );
};
