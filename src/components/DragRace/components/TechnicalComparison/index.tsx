"use client";

import { Car, Participant } from "@/types/types";
import { Gauge, Ruler, Fuel, Settings2, Info, CheckCircle2, Trophy } from "lucide-react";
import React, { useMemo } from "react";

interface TechnicalComparisonProps {
    participants: Participant[];
    cars: Car[];
}

// Auxiliar para tratar strings de consumo (ex: "12,6 km/l")
const parseConsumption = (val: string | null | undefined) => {
    if (!val) return 0;
    return parseFloat(val.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
};

export const TechnicalComparison: React.FC<TechnicalComparisonProps> = ({
    cars,
    participants,
}) => {
    const carsMap = useMemo(() => new Map(cars.map((c) => [c.id, c])), [cars]);

    /**
     * Definição das seções técnica.
     * Nota: Para Potência, Torque e 0-100, usamos o p.stage para acessar car.specs[stage]
     */
    const technicalSections = useMemo(() => [
        {
            title: "Performance & Tuning",
            icon: <Gauge size={18} className="text-blue-500" />,
            fields: [
                {
                    label: "Potência",
                    getValue: (c: Car, p: Participant) => c.specs[p.stage].hp,
                    unit: "cv",
                    better: "high" as const
                },
                {
                    label: "Torque",
                    getValue: (c: Car, p: Participant) => c.specs[p.stage].torque,
                    unit: "kgfm",
                    better: "high" as const
                },
                {
                    label: "0-100 km/h",
                    getValue: (c: Car, p: Participant) => c.specs[p.stage].zeroToHundred,
                    unit: "s",
                    better: "low" as const
                },
                {
                    label: "Vel. Máxima",
                    getValue: (c: Car) => c.performance?.topSpeed || 0,
                    unit: "km/h",
                    better: "high" as const
                },
            ],
        },
        {
            title: "Consumo Médio",
            icon: <Fuel size={18} className="text-green-500" />,
            fields: [
                { label: "Cidade (G)", getValue: (c: Car) => parseConsumption(c.consumption?.cityGasoline), unit: "km/l", better: "high" as const },
                { label: "Estrada (G)", getValue: (c: Car) => parseConsumption(c.consumption?.highwayGasoline), unit: "km/l", better: "high" as const },
                { label: "Cidade (E)", getValue: (c: Car) => parseConsumption(c.consumption?.cityEthanol), unit: "km/l", better: "high" as const },
            ],
        },
        {
            title: "Dimensões & Capacidade",
            icon: <Ruler size={18} className="text-orange-500" />,
            fields: [
                { label: "Porta-malas", getValue: (c: Car) => c.dimensions?.trunkCapacity || 0, unit: "L", better: "high" as const },
                { label: "Tanque", getValue: (c: Car) => c.capacity?.fuelTank || 0, unit: "L", better: "high" as const },
                { label: "Peso", getValue: (c: Car) => c.weight || 0, unit: "kg", better: "low" as const },
                { label: "Entre-eixos", getValue: (c: Car) => c.dimensions?.wheelbase || 0, unit: "mm", better: "high" as const },
            ],
        },
        {
            title: "Mecânica",
            icon: <Settings2 size={18} className="text-gray-500" />,
            fields: [
                { label: "Aro da Roda", getValue: (c: Car) => c.tires?.wheelSize || 0, unit: "pol", better: "high" as const },
                { label: "Cilindros", getValue: (c: Car) => c.engine?.cylinders || 0, unit: "cil", better: "high" as const },
            ],
        },
    ], []);

    /**
     * Scoreboard baseado em quem vence em cada linha técnica
     */
    const scoreboard = useMemo(() => {
        const scores: Record<string, number> = {};
        participants.forEach(p => { scores[p.tempId] = 0; });

        technicalSections.forEach(section => {
            section.fields.forEach(field => {
                const rowValues = participants.map(p => {
                    const car = carsMap.get(p.id);
                    return { tempId: p.tempId, val: car ? field.getValue(car, p) : 0 };
                });

                const numericValues = rowValues.map(v => v.val);
                const bestVal = field.better === "high" ? Math.max(...numericValues) : Math.min(...numericValues);

                rowValues.forEach(v => {
                    if (v.val === bestVal && bestVal !== 0) scores[v.tempId]++;
                });
            });
        });
        return scores;
    }, [participants, carsMap, technicalSections]);

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 overflow-x-auto">
            <h3 className="text-gray-800 text-[11px] font-bold mb-6 flex items-center gap-2">
                <Info size={18} className="text-[#6319F7]" />
                Comparativo Técnico
            </h3>

            <div className="min-w-[750px]">
                {/* Header com Nome, Versão e Stage */}
                <div className="grid grid-cols-12 gap-2 mb-6 border-b border-gray-100 pb-4">
                    <div className="col-span-4"></div>
                    {participants.map((p) => {
                        const car = carsMap.get(p.id)!;
                        return (
                            <div key={p.tempId} className="col-span-2 text-center flex flex-col items-center">
                                <span className="text-[10px] font-black text-gray-600 uppercase mb-1">{car.make}</span>
                                <span className="text-xs font-bold text-gray-500 line-clamp-1">{car.version}</span>
                                <span className={`text-[9px] font-bold px-1.5 rounded mt-1 uppercase ${p.stage === 'stock' ? 'bg-gray-100 text-gray-500' : 'bg-orange-100 text-orange-600'}`}>
                                    {p.stage}
                                </span>
                                <div className="mt-2 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                                    <Trophy size={10} className="text-[#6319F7]" />
                                    <span className="text-[10px] font-bold text-[#6319F7]">{scoreboard[p.tempId]} vitórias</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Seções Técnicas */}
                {technicalSections.map((section, sIdx) => (
                    <div key={sIdx} className="mb-8 last:mb-0">
                        <div className="flex items-center gap-2 mb-3 px-1">
                            {section.icon}
                            <h4 className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">{section.title}</h4>
                        </div>

                        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            {section.fields.map((field, fIdx) => {
                                const valuesInRow = participants.map(p => field.getValue(carsMap.get(p.id)!, p));
                                const bestValue = field.better === "high" ? Math.max(...valuesInRow) : Math.min(...valuesInRow);

                                return (
                                    <div key={fIdx} className="grid grid-cols-12 gap-2 py-3.5 border-b last:border-0 border-gray-50 hover:bg-gray-50 transition-colors">
                                        <div className="col-span-4 flex items-center pl-4">
                                            <span className="text-sm font-semibold text-gray-600">{field.label}</span>
                                        </div>

                                        {participants.map((p) => {
                                            const car = carsMap.get(p.id)!;
                                            const val = field.getValue(car, p);
                                            const isBest = val === bestValue && val !== 0;

                                            return (
                                                <div key={p.tempId} className="col-span-2 flex flex-col items-center justify-center relative">
                                                    <div className={`text-sm font-bold flex items-baseline gap-0.5 ${isBest ? "text-green-600" : "text-gray-800"}`}>
                                                        {typeof val === 'number' ? val.toLocaleString('pt-BR') : val}
                                                        <span className={`text-[9px] font-medium uppercase ${isBest ? "text-green-500/70" : "text-gray-400"}`}>
                                                            {field.unit}
                                                        </span>
                                                    </div>
                                                    {isBest && (
                                                        <div className="absolute right-1">
                                                            <CheckCircle2 size={12} className="text-green-500 opacity-60" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};