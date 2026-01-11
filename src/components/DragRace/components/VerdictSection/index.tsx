"use client";

import { Car, Participant } from "@/types/types";
import { calculateOverallRanking, RankingItem } from "@/utils";
import { Star, ThumbsUp, Gauge, ShieldCheck, Trophy } from "lucide-react";
import React, { useMemo } from "react";

interface VerdictSectionProps {
    participants: Participant[];
    cars: Car[];
}

export const VerdictSection: React.FC<VerdictSectionProps> = ({ participants, cars }) => {
    // Tipagem explícita do useMemo para garantir que ranking seja RankingItem[]
    const ranking = useMemo<RankingItem[]>(() =>
        calculateOverallRanking({ participants, cars }),
        [cars, participants]);

    return (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl text-white mt-8 border-l-4 border-[#6319F7]">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#6319F7] p-2 rounded-lg">
                    <Star className="text-white" fill="currentColor" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Veredito AutoWebSpec</h2>
                    <p className="text-xs text-gray-400 font-medium">Performance, Ficha Técnica e Equipamentos</p>
                </div>
            </div>

            <div className="grid gap-4">
                {ranking.map((item, index) => (
                    <div
                        key={item.tempId}
                        className={`relative p-5 rounded-xl flex items-center gap-4 transition-all ${index === 0
                            ? 'bg-white/10 border border-[#6319F7]/50 shadow-2xl'
                            : 'bg-white/5 border border-white/5'
                            }`}
                    >
                        {/* Badge de Rank */}
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full font-black text-sm shrink-0 ${index === 0 ? 'bg-yellow-400 text-black' :
                            index === 1 ? 'bg-gray-300 text-black' :
                                index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-500 text-white'
                            }`}>
                            {index + 1}º
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`font-bold text-sm md:text-base truncate ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                                    {item.car.make} {item.car.model} <span className=" text-xs font-normal italic">({item.car.version})</span>
                                </h3>
                                {index === 0 && (
                                    <span className="bg-[#6319F7] text-[9px] px-2 py-1 rounded font-black flex items-center gap-1 shrink-0">
                                        <ThumbsUp size={10} /> MELHOR ESCOLHA
                                    </span>
                                )}
                            </div>

                            {/* Tags Técnicas baseadas no Score */}
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-gray-200 uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                    <Gauge size={12} className="text-blue-400 pr-1" /> {item.stats.hp}cv ({item.stage})
                                </span>
                                <span className="flex items-center gap-1">
                                    <ShieldCheck size={12} className="text-green-400 pr-1" /> {item.equipCount} Opcionais
                                </span>
                                <span className="flex items-center gap-1">
                                    <Trophy size={12} className="text-purple-400 pr-1" /> {item.techWins} Vitórias
                                </span>
                            </div>
                        </div>

                        {/* Coluna de Score */}
                        <div className="w-20 text-right shrink-0 border-l border-white/10 pl-4">
                            <div className={`text-xs font-bold ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>Score</div>
                            <div className={`text-xl font-black ${index === 0 ? 'text-yellow-400' : 'leading-tight'} `}>{item.totalScore.toFixed(1)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};