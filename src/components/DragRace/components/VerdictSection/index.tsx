"use client"
import { Car, Participant } from "@/types/types";
import { calculateOverallRanking } from "@/utils";
import { Star, ThumbsUp } from "lucide-react";
import { useMemo } from "react";

interface VerdictSectionProps {
    participants: Participant[];
    cars: Car[];
}

export const VerdictSection: React.FC<VerdictSectionProps> = ({ participants, cars }) => {
    const ranking = useMemo(() => calculateOverallRanking({ participants, cars }), [cars, participants]);

    return (
        <div className="bg-linear-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg text-white mt-8 border-l-4 border-[#6319F7]">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#6319F7] p-2 rounded-lg">
                    <Star className="text-white" fill="currentColor" size={20} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Veredito AutoWebSpec</h2>
                    <p className="text-xs text-gray-400">Análise baseada em Potência, Preço e Equipamentos</p>
                </div>
            </div>

            <div className="grid gap-3">
                {ranking.map((item, index) => (
                    <div key={item.tempId} className={`relative p-4 rounded-lg flex items-center gap-4 transition-all ${index === 0 ? 'bg-white/10 border border-[#6319F7]/50 shadow-lg' : 'bg-white/5 border border-white/5'}`}>

                        {/* Rank Badge */}
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${index === 0 ? 'bg-yellow-400 text-black' :
                            index === 1 ? 'bg-gray-300 text-black' :
                                index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-700 text-gray-400'
                            }`}>
                            {index + 1}º
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={` w-m truncate font-bold text-sm md:text-base ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>
                                    {item.car.model} {item.car.make} {item.car.year} {item.car.version}
                                </h3>
                                {index === 0 && <span className="bg-[#6319F7] text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1 absolute -top-5 right-0"><ThumbsUp size={10} /> MELHOR ESCOLHA</span>}
                            </div>
                            <div className="flex gap-4 text-[10px] text-gray-400 mt-1">
                                <span>R$ {item.car.price.toLocaleString('pt-BR', { notation: "compact" })}</span>
                                <span>•</span>
                                <span>{item.stats.hp}cv ({item.stage === 'stock' ? 'Stock' : item.stage})</span>
                                <span>•</span>
                                <span>{item.equipCount} Opcionais</span>
                            </div>
                        </div>

                        {/* Score Bar */}
                        <div className="w-20 text-right hidden sm:block">
                            <div className="text-xs font-bold text-[#6319F7]">Nota {item.totalScore.toFixed(1)}</div>
                            <div className="h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-[#6319F7]" style={{ width: `${item.totalScore}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
