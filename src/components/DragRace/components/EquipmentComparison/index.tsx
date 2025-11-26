import { Car } from "@/components/Main/data";
import { Participant } from "@/types/types";
import { Check, Scale, Trophy, X } from "lucide-react";

interface EquipmentComparisonProps {
  participants: Participant[];
  cars: Car[];
}

export const EquipmentComparison: React.FC<EquipmentComparisonProps> = ({ cars, participants }) => {
    const allFeatures = Array.from(new Set(
        participants.flatMap(p => Object.keys(cars.find(c => c.id === p.id)!.equipment))
    ));

    // Calcular quem tem mais equipamentos para destacar
    const participantsWithCount = participants.map(p => {
        const car = cars.find(c => c.id === p.id)!;
        const count = Object.values(car.equipment).filter(Boolean).length;
        return { ...p, count };
    });
    
    const maxEquipCount = Math.max(...participantsWithCount.map(p => p.count));

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 overflow-x-auto">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2"><Scale size={18} className="text-[#6319F7]" /> Lista de Equipamentos</h3>
            <div className="min-w-[500px]">
                <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 font-bold uppercase mb-2 pb-2 border-b border-gray-100">
                    <div className="col-span-4 text-left pl-2">Item</div>
                    {participantsWithCount.map(p => {
                        const car = cars.find(c => c.id === p.id)!;
                        const isWinner = p.count === maxEquipCount;
                        return (
                            <div key={p.tempId} className="col-span-2 text-center flex flex-col items-center px-1 relative">
                                {isWinner && (
                                    <div className="absolute -top-6 bg-yellow-100 text-yellow-700 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                        <Trophy size={10} /> Vencedor
                                    </div>
                                )}
                                <span className="truncate w-full" title={car.model}>{car.make}</span>
                                <span className="text-[9px] text-gray-300 block truncate w-full">{car.version}</span>
                                <span className={`text-[10px] mt-1 font-bold ${isWinner ? 'text-[#6319F7]' : 'text-gray-400'}`}>
                                    {p.count} itens
                                </span>
                            </div>
                        );
                    })}
                </div>
                
                {allFeatures.map((feature) => (
                    <div key={feature} className="grid grid-cols-12 gap-2 items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded px-2">
                        <div className="col-span-4 text-sm font-medium text-gray-600 truncate" title={feature}>{feature}</div>
                        {participants.map(p => {
                            const car = cars.find(c => c.id === p.id)!;
                            const hasItem = car.equipment[feature];
                            return (
                                <div key={p.tempId} className="col-span-2 flex justify-center">
                                    {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-300" />}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};