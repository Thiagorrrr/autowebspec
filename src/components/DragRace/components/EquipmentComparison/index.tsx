"use client"
import { Car, EquipmentCategoryKey, EquipmentItems, Participant } from "@/types/types";
import { Check, Scale, Trophy, X, Layers } from "lucide-react";

interface EquipmentComparisonProps {
    participants: Participant[];
    cars: Car[];
}

export const EquipmentComparison: React.FC<EquipmentComparisonProps> = ({ cars, participants }) => {

    const allCategories = Array.from(new Set(
        participants.flatMap(p => {
            const car = cars.find(c => c.id === p.id);
            return car ? Object.keys(car.equipment) : [];
        })
    ));

    const participantsWithCount = participants.map(p => {
        const car = cars.find(c => c.id === p.id)!;

        const count = Object.values(car.equipment)
            .flatMap(category => Object.values(category))
            .filter(Boolean).length;

        return { ...p, count };
    });

    const maxEquipCount = Math.max(...participantsWithCount.map(p => p.count));

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 overflow-x-auto">
            <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
                <Scale size={18} className="text-[#6319F7]" /> Comparativo de Equipamentos
            </h3>

            <div className="min-w-[600px]">
                {/* Cabeçalho */}
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

                                <span className={`text-[10px] mt-1 font-bold ${isWinner ? "text-[#6319F7]" : "text-gray-400"}`}>
                                    {p.count} itens
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* CATEGORIAS */}
                {allCategories.map((category) => {
                    const categoryKey = category as EquipmentCategoryKey;
                    const firstCar = cars.find(c => c.id === participants[0].id)! as Car;
                    const items = Object.keys(firstCar.equipment[categoryKey]);


                    return (
                        <div key={category} className="mb-4 rounded-lg overflow-hidden border border-gray-100">
                            {/* Cabeçalho da Categoria */}
                            <div className="bg-gray-50 p-3 flex items-center gap-2 border-b border-gray-100">
                                <Layers size={16} className="text-[#6319F7]" />
                                <h4 className="font-bold text-gray-700">{category}</h4>
                            </div>

                            {/* Itens da Categoria */}
                            {items.map((item) => {
                                // Asserção de tipo para o item, já que ele é uma chave (string)
                                const itemKey = item as string;

                                return (
                                    <div
                                        key={item}
                                        className="grid grid-cols-12 gap-2 items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2"
                                    >
                                        <div className="col-span-4 text-sm font-medium text-gray-600 truncate" title={item}>
                                            {item}
                                        </div>

                                        {participants.map(p => {
                                            // É bom tipar car se possível, mas o foco é na indexação
                                            const car = cars.find(c => c.id === p.id)!;

                                            // CORREÇÃO APLICADA: 
                                            // Substituí 'category' por 'categoryKey' 
                                            const categoryItems = car.equipment[categoryKey] as EquipmentItems;
                                            const hasItem = categoryItems?.[itemKey];

                                            return (
                                                <div key={p.tempId} className="col-span-2 flex justify-center">
                                                    {hasItem ? (
                                                        <Check size={16} className="text-[#6319F7]" />
                                                    ) : (
                                                        <X size={16} className="text-gray-300" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
