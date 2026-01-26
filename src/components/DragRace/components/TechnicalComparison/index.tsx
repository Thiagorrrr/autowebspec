"use client";

import { Car, Participant } from "@/types/types";
import { Gauge, Zap, Fuel, Settings2, Info, CheckCircle2, Trophy, AlertCircle, Ruler, CircleDot, Leaf } from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

interface TechnicalField {
    label: string;
    getValue: (c: Car, p: Participant) => string | number;
    better: "high" | "low";
    unit?: string;
    weight?: { [key: string]: number | undefined };
}

interface TechnicalSection {
    title: string;
    icon: React.ReactNode;
    fields: TechnicalField[];
}

interface TechnicalComparisonProps {
    participants: Participant[];
    cars: Car[];
}

const parseCO2 = (value?: string | null | undefined) => {
    if (!value) return 0;
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : 0;
};

const parseConsumption = (val: string | null | undefined): number => {
    if (!val) return 0;
    return parseFloat(val.replace(/[^\d,.]/g, "").replace(",", ".")) || 0;
};

export const TechnicalComparison: React.FC<TechnicalComparisonProps> = ({
    cars,
    participants,
}) => {
    const carsMap = useMemo(() => new Map(cars.map((c) => [c.id, c])), [cars]);

    const getNormalizedValue = (field: TechnicalField, car: Car, p: Participant): number => {
        const rawVal = field.getValue(car, p);
        if (typeof rawVal === "string") {
            const normalizedRaw = rawVal.toLowerCase();
            if (field.weight) {
                const foundKey = Object.keys(field.weight).find(key =>
                    normalizedRaw.includes(key.toLowerCase())
                );
                if (foundKey) return field.weight[foundKey] || 0;
            }
            const parsed = parseFloat(rawVal.replace(",", "."));
            return isNaN(parsed) ? 0 : parsed;
        }
        return typeof rawVal === "number" ? rawVal : 0;
    };

    const technicalSections = useMemo<TechnicalSection[]>(() => [
        {
            title: "Performance & Tuning",
            icon: <Gauge size={18} className="text-blue-500" />,
            fields: [
                { label: "0-100 km/h", getValue: (c, p) => c.specs[p.stage].zeroToHundred, unit: "s", better: "low" },
                { label: "Vel. Máxima", getValue: (c) => c.performance?.topSpeed || 0, unit: "km/h", better: "high" },
                { label: "Peso/Potência", getValue: (c) => c.performance?.powerToWeight || 0, unit: "kg/cv", better: "low" },
            ],
        },
        {
            title: "Motor",
            icon: <Zap size={18} className="text-orange-500" />,
            fields: [
                {
                    label: "Aspiração",
                    getValue: (c) => c.engine?.aspiration || "N/A",
                    better: "high",
                    weight: { "Turbo": 2, "Aspirado": 1 }
                },
                {
                    label: "Cilindrada",
                    getValue: (c) => c.engine?.displacement || "N/A",
                    unit: "L",
                    better: "high"
                },
                {
                    label: "Cilindros",
                    getValue: (c) => c.engine?.cylinders || 0,
                    better: "high"
                },
                {
                    label: "Potência",
                    getValue: (c) => c.engine?.powerHp || 0,
                    unit: "cv",
                    better: "high"
                },
                {
                    label: "Torque",
                    getValue: (c) => c.engine?.torqueKgfM || 0,
                    unit: "kgfm",
                    better: "high"
                },
                {
                    label: "Injeção",
                    getValue: (c) => c.engine?.injection || "N/A",
                    better: "high",
                    weight: { "Direta": 2, "Indireta": 1 }
                },
                {
                    label: "Válvulas",
                    getValue: (c) => c.engine?.valves || 0,
                    better: "high"
                },
            ],
        },
        {
            title: "Consumo Médio",
            icon: <Fuel size={18} className="text-green-500" />,
            fields: [
                { label: "Cidade (G)", getValue: (c) => parseConsumption(c.consumption?.cityGasoline), unit: "km/l", better: "high" },
                { label: "Estrada (G)", getValue: (c) => parseConsumption(c.consumption?.highwayGasoline), unit: "km/l", better: "high" },
                { label: "Cidade (E)", getValue: (c) => parseConsumption(c.consumption?.cityEthanol), unit: "km/l", better: "high" },
                { label: "Estrada (E)", getValue: (c) => parseConsumption(c.consumption?.highwayEthanol), unit: "km/l", better: "high" },
            ],
        },
        {
            title: "Dimensões & Capacidade",
            icon: <Ruler size={18} className="text-orange-500" />,
            fields: [
                { label: "Porta-malas", getValue: (c) => c.dimensions?.trunkCapacity || 0, unit: "L", better: "high" },
                { label: "Tanque", getValue: (c) => c.capacity?.fuelTank || 0, unit: "L", better: "high" },
                { label: "Carga Útil", getValue: (c) => c.capacity?.payload || 0, unit: "kg", better: "high" },
                { label: "Peso", getValue: (c) => c.weight || 0, unit: "kg", better: "low" },
                { label: "Entre-eixos", getValue: (c) => c.dimensions?.wheelbase || 0, unit: "mm", better: "high" },
            ],
        },
        {
            title: "Câmbio & Tração",
            icon: <Settings2 size={18} className="text-gray-500" />,
            fields: [
                {
                    label: "Tipo",
                    getValue: (c) => c.transmissionDetails?.type || "Manual",
                    better: "high",
                    weight: {
                        "Dupla Embreagem": 4,
                        "Automático": 3,
                        "CVT": 2,
                        "Manual": 1,
                    }
                },
                {
                    label: "Marchas",
                    getValue: (c) => {
                        const gears = c.transmissionDetails?.gears;
                        if (typeof gears === "number") {
                            return `${gears} marchas`;
                        }
                        return gears || "";
                    },
                    better: "high",
                    weight: {
                        "8 marchas": 5,
                        "7 marchas": 4,
                        "6 marchas": 3,
                        "5 marchas": 2,
                        "4 marchas": 1,
                        "3 marchas": 0
                    }
                },
                {
                    label: "Tração",
                    getValue: (c) => c.transmissionDetails?.traction || "Dianteira",
                    better: "high",
                    weight: {
                        "Traseira": 3,
                        "Integral": 2,
                        "Dianteira": 1,
                        "4x4": 4
                    }
                },
            ],
        },
        {
            title: "Suspensão & Freios",
            icon: <Settings2 size={18} className="text-slate-500" />,
            fields: [
                {
                    label: "Freio Dianteiro",
                    getValue: (c) => c.brakes?.front || "N/A",
                    better: "high",
                    weight: { "disco": 2, "tambor": 1 }
                },
                {
                    label: "Freio Traseiro",
                    getValue: (c) => c.brakes?.rear || "N/A",
                    better: "high",
                    weight: { "disco": 2, "tambor": 1 }
                },
                {
                    label: "Suspensão Dianteira",
                    getValue: (c) => c.suspension?.front || "N/A",
                    better: "high",
                    weight: { "multilink": 3, "independente": 2, "eixo de torção": 1 }
                },
                {
                    label: "Suspensão Traseira",
                    getValue: (c) => c.suspension?.rear || "N/A",
                    better: "high",
                    weight: { "multilink": 3, "independente": 2, "eixo de torção": 1 }
                },
            ],
        },
        {
            title: "Rodas & Pneus",
            icon: <CircleDot size={18} className="text-zinc-500" />,
            fields: [
                {
                    label: "Aro",
                    getValue: (c) => c.tires?.wheelSize || "",
                    better: "high",
                },
                {
                    label: "Pneu Dianteiro",
                    getValue: (c) => c.tires?.front || "",
                    better: "high",
                },
                {
                    label: "Pneu Traseiro",
                    getValue: (c) => c.tires?.rear || "",
                    better: "high",
                },
            ],
        },
        {
            title: "Mercado & Garantia",
            icon: <Info size={18} className="text-purple-500" />,
            fields: [
                {
                    label: "FIPE",
                    getValue: (c) => c.price || 0,
                    unit: "R$",
                    better: "low"
                },
                {
                    label: "Garantia de Fábrica",
                    getValue: (c) => c.warranty?.manufacturer || "N/A",
                    better: "high",
                    weight: { "5 anos": 3, "3 anos": 2, "1 ano": 1 }
                },
                {
                    label: "Montagem",
                    getValue: (c) => c.assembly || "N/A",
                    better: "high"
                },
                { label: "Origem", getValue: (c) => c.origin || "Importado", better: "high", weight: { "nacional": 2, "importado": 1 } },
                {
                    label: "Lançamento",
                    getValue: (c) => c.year || "N/A",
                    better: "high"
                }
            ],
        },
        {
            title: "Emissões & Eficiência",
            icon: <Leaf size={18} className="text-green-600" />,
            fields: [
                {
                    label: "CO₂",
                    getValue: (c) => parseCO2(c.emissions?.co2),
                    unit: "g/km",
                    better: "low"
                },
                {
                    label: "Padrão Ambiental",
                    getValue: (c) => c.emissions?.standard || "N/A",
                    better: "high",
                    weight: {
                        "Proconve L8": 3,
                        "Proconve L7": 2,
                        "Proconve L6": 1
                    }
                },
                {
                    label: "Combustível",
                    getValue: (c) => c.fuel || "N/A",
                    better: "high",
                    weight: {
                        "Elétrico": 3,
                        "Híbrido": 2,
                        "Flex": 1,
                        "Gasolina": 0,
                        "Alcool": 0
                    }
                }
            ],
        },
        {
            title: "Problemas crônicos",
            icon: <AlertCircle size={18} className="text-red-600" />,
            fields: [
                {
                    label: "Quantidade",
                    getValue: (c) => c?.chronic.length,
                    unit: "",
                    better: "low"
                },
            ],
        }


    ], []);

    const scoreboard = useMemo(() => {
        const scores: Record<string, number> = {};
        participants.forEach(p => { scores[p.tempId] = 0; });

        technicalSections.forEach(section => {
            section.fields.forEach(field => {
                const rowValues = participants.map(p => ({
                    tempId: p.tempId,
                    val: getNormalizedValue(field, carsMap.get(p.id)!, p)
                }));

                const numericValues = rowValues.map(v => v.val);
                const allEqual = numericValues.every(v => v === numericValues[0]);

                if (!allEqual && numericValues.some(v => v !== 0)) {
                    const bestVal = field.better === "high" ? Math.max(...numericValues) : Math.min(...numericValues);
                    rowValues.forEach(v => {
                        if (v.val === bestVal) scores[v.tempId]++;
                    });
                }
            });
        });
        return scores;
    }, [participants, carsMap, technicalSections]);

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mt-6 overflow-x-auto text-gray-800">
            <h3 className="text-[11px] font-bold mb-6 uppercase flex items-center gap-2">
                <Info size={18} className="text-[#6319F7]" />
                Comparativo Técnico
            </h3>

            <div className="min-w-[750px]">
                <div className="grid grid-cols-12 gap-2 mb-6 border-b border-gray-100 pb-4">
                    <div className="col-span-4"></div>
                    {participants.map((p) => {
                        const car = carsMap.get(p.id);
                        if (!car) return null;
                        return (
                            <div key={p.tempId} className="col-span-2 text-center flex flex-col items-center">
                                <span className="text-[10px] font-black  uppercase">{car.make}</span>
                                <span className="text-xs font-bold line-clamp-1">{car.version}</span>
                                <div className="mt-2 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                                    <Trophy size={10} className="text-[#6319F7]" />
                                    <span className="text-[10px] font-bold text-[#6319F7]">{scoreboard[p.tempId]} Vitórias</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {technicalSections.map((section, sIdx) => (
                    <div key={sIdx} className="mb-8 last:mb-0">
                        <div className="flex items-center gap-2 mb-3 px-1 text-black">
                            {section.icon}
                            <h4 className="font-bold uppercase tracking-widest">{section.title}</h4>
                        </div>

                        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                            {section.fields.map((field, fIdx) => {
                                const rowData = participants.map(p => ({
                                    tempId: p.tempId,
                                    display: field.getValue(carsMap.get(p.id)!, p),
                                    normalized: getNormalizedValue(field, carsMap.get(p.id)!, p)
                                }));

                                const vals = rowData.map(r => r.normalized);
                                const isDraw = vals.every(v => v === vals[0]) && vals[0] !== 0;
                                const bestVal = field.better === "high" ? Math.max(...vals) : Math.min(...vals);

                                return (
                                    <div key={fIdx} className="grid grid-cols-12 gap-2 py-3.5 border-b last:border-0 border-gray-50 hover:bg-gray-50 transition-colors">
                                        <div className="col-span-4 flex items-center pl-4">
                                            <span className="text-sm font-semibold text-gray-600">{field.label}</span>
                                        </div>

                                        {rowData.map((res) => {
                                            const isBest = res.normalized === bestVal && res.normalized !== 0;

                                            // Definição de Cores: Amarelo se for empate total, Verde se for o melhor único/vencedor
                                            const textColor = isDraw ? "text-amber-600" : isBest ? "text-green-700" : "text-gray-800";

                                            return (
                                                <div key={res.tempId} className="col-span-2 flex gap-1.5 items-center justify-center relative px-2">
                                                    <div className={`text-sm font-bold flex items-baseline gap-0.5 text-wrap text-center ${textColor}`}>
                                                        {typeof res.display === 'number' ? res.display.toLocaleString('pt-BR') : res.display}
                                                        {field.unit && <span className="text-[9px] font-medium uppercase opacity-60 ml-0.5">{field.unit}</span>}
                                                    </div>
                                                    {isBest && !isDraw && (
                                                        <div className=" right-1">
                                                            <CheckCircle2 size={12} className="text-green-600" />
                                                        </div>
                                                    )}
                                                    {isDraw && (
                                                        <div className=" right-1">
                                                            <AlertCircle size={12} className="text-amber-500" />
                                                        </div>
                                                    )}
                                                    {
                                                        section.title === "Problemas crônicos" && (
                                                            <>
                                                                <Link href={`/detalhes`} className="underline hover:no-underline"> Detalhes
                                                                </Link>

                                                            </>
                                                        )
                                                    }
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