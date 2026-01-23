"use client";

import { Car, EquipmentCategoryKey, EquipmentItems, Participant } from "@/types/types";
import { Check, Scale, Trophy, X, Layers } from "lucide-react";
import React, { useMemo } from "react";

interface EquipmentComparisonProps {
    participants: Participant[];
    cars: Car[];
}

export const EquipmentComparison: React.FC<EquipmentComparisonProps> = ({
    cars,
    participants,
}) => {
    /**
     * Mapa de carros para evitar vários .find()
     */
    const carsMap = useMemo(
        () => new Map(cars.map((c) => [c.id, c])),
        [cars]
    );

    /**
     * Todas as categorias existentes em QUALQUER carro
     */
    const allCategories = useMemo(() => {
        return Array.from(
            new Set(
                participants.flatMap((p) => {
                    const car = carsMap.get(p.id);
                    return car ? Object.keys(car.equipment) : [];
                })
            )
        );
    }, [participants, carsMap]);

    /**
     * Participantes com contagem total de equipamentos TRUE
     */
    const participantsWithCount = useMemo(() => {
        return participants.map((p) => {
            const car = carsMap.get(p.id)!;

            const count = Object.values(car.equipment)
                .flatMap((category) => Object.values(category))
                .filter(Boolean).length;

            return { ...p, count };
        });
    }, [participants, carsMap]);

    const maxEquipCount = Math.max(
        ...participantsWithCount.map((p) => p.count)
    );

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 overflow-x-auto">
            <h3 className="text-black font-bold mb-4 flex items-center uppercase gap-2">
                <Scale size={18} className="text-[#6319F7] " />
                Comparativo de Equipamentos
            </h3>

            <div className="min-w-[600px]">
                {/* Cabeçalho */}
                <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 font-bold uppercase mb-2 pb-2 border-b border-gray-100">
                    <div className="col-span-4 text-left pl-2">Item</div>

                    {participantsWithCount.map((p) => {
                        const car = carsMap.get(p.id)!;
                        const isWinner = p.count === maxEquipCount;

                        return (
                            <div
                                key={p.tempId}
                                className="col-span-2 text-center flex flex-col items-center px-1 relative"
                            >
                                {isWinner && (
                                    <div className="absolute -top-6 bg-yellow-100 text-yellow-700 text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                        <Trophy size={10} />
                                        Vencedor
                                    </div>
                                )}

                                <span className="text-sm text-black truncate w-full" title={car.model}>
                                    {car.make}
                                </span>
                                <span className="ext-xs font-bold text-gray-500 block truncate w-full">
                                    {car.version}
                                </span>

                                <span
                                    className={`text-[10px] mt-1 font-bold ${isWinner ? "text-[#6319F7]" : "text-gray-400"
                                        }`}
                                >
                                    {p.count} itens
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* CATEGORIAS */}
                {allCategories.map((category) => {
                    const categoryKey = category as EquipmentCategoryKey;

                    /**
                     * TODOS os itens da categoria existentes em QUALQUER carro
                     */
                    const items = Array.from(
                        new Set(
                            participants.flatMap((p) => {
                                const car = carsMap.get(p.id);
                                return Object.keys(car?.equipment?.[categoryKey] ?? {});
                            })
                        )
                    );

                    return (
                        <div
                            key={category}
                            className="mb-4 rounded-lg overflow-hidden border border-gray-100"
                        >
                            {/* Cabeçalho da Categoria */}
                            <div className="bg-gray-50 p-3 flex items-center gap-2 border-b border-gray-100">
                                <Layers size={16} className="text-[#6319F7]" />
                                <h4 className="font-bold text-gray-700 capitalize">
                                    {category}
                                </h4>
                            </div>

                            {/* Itens da Categoria */}
                            {items.map((item) => {
                                const itemKey = item as keyof EquipmentItems;

                                return (
                                    <div
                                        key={item}
                                        className="grid grid-cols-12 gap-2 items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors px-2"
                                    >
                                        <div
                                            className="col-span-4 text-md font-medium text-gray-600 truncate"
                                            title={item}
                                        >
                                            {item}
                                        </div>

                                        {participants.map((p) => {
                                            const car = carsMap.get(p.id)!;
                                            const categoryItems =
                                                car.equipment[categoryKey] as EquipmentItems;

                                            const hasItem =
                                                categoryItems?.[itemKey] === true;

                                            return (
                                                <div
                                                    key={p.tempId}
                                                    className="col-span-2 flex justify-center"
                                                >
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
