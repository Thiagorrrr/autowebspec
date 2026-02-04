"use client"
import { Car, Participant, StageType } from "@/types/types";
import { X, Loader2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Image from 'next/image';
import { useCarsById } from "@/hooks/queries/useCarsById";

interface DetailedCarSelectorProps {
    rawCars: Car[]; // Lista leve do Summary
    participant: Participant;
    onUpdate: (tempId: number, newData: Partial<Participant>) => void;
    onRemove: (tempId: number) => void;
    showRemove: boolean;
}

export const DetailedCarSelector: React.FC<DetailedCarSelectorProps> = ({ rawCars, participant, onRemove, onUpdate, showRemove }) => {
    // Busca dados completos apenas se houver participant.id
    const { data: car, isLoading } = useCarsById(participant.id);

    // Estados locais para os selects funcionarem em cascata
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYear, setSelectedYear] = useState<number | "">("");

    // Sincroniza os selects locais quando um carro é carregado (ex: via URL ou após selecionar Versão)
    useEffect(() => {
        if (car) {
            setSelectedMake(car.make);
            setSelectedModel(car.model);
            setSelectedYear(Number(car.year));
        }
    }, [car]);

    // --- LÓGICA DE FILTRAGEM ---

    // 1. Fabricantes Únicos (A Lambda já envia ordenado e limpo)
    const makes = useMemo(() => {
        return [...new Set(rawCars.map(c => c.make))];
    }, [rawCars]);

    // 2. Modelos filtrados pela Marca selecionada
    const models = useMemo(() => {
        if (!selectedMake) return [];
        return [...new Set(rawCars
            .filter(c => c.make === selectedMake)
            .map(c => c.model)
        )];
    }, [rawCars, selectedMake]);

    // 3. Anos filtrados por Marca e Modelo
    const years = useMemo(() => {
        if (!selectedModel) return [];
        return [...new Set(rawCars
            .filter(c => c.make === selectedMake && c.model === selectedModel)
            .map(c => c.year)
        )];
    }, [rawCars, selectedMake, selectedModel]);

    // 4. Versões para encontrar o ID final
    const versions = useMemo(() => {
        if (!selectedYear) return [];
        return rawCars.filter(c =>
            c.make === selectedMake &&
            c.model === selectedModel &&
            Number(c.year) === Number(selectedYear)
        );
    }, [rawCars, selectedMake, selectedModel, selectedYear]);

    return (
        <div className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full relative transition-all ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
            {showRemove && (
                <button onClick={() => onRemove(participant.tempId)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 shadow-sm hover:bg-red-500 hover:text-white transition-colors z-10">
                    <X size={14} />
                </button>
            )}

            {/* Overlay de Loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20 rounded-xl">
                    <Loader2 className="animate-spin text-[#6319F7]" size={24} />
                </div>
            )}

            <div className="flex-1 flex items-end w-full mt-2">
                <div className="relative w-full h-20 lg:h-40 rounded-lg">
                    <div className="absolute w-full h-50 lg:h-80 -top-30 lg:-top-40">
                        <Image
                            src={
                                car
                                    ? `/marcas/${car.make.toLowerCase()}/${car.model.toLowerCase()}/${car.model.toLowerCase()}${Number(car.year) <= 2019 ? "-2" : ""}.webp`
                                    : "/marcas/default/default.webp"
                            }
                            alt={car?.model || "default"}
                            fill
                            className="w-full h-full object-contain"
                        />

                        {car && (
                            <div className="absolute bottom-2 left-0 text-black font-bold text-[10px] bg-white/80 px-1 rounded shadow-sm">
                                {car.specs?.[participant.stage]?.hp || car.specs?.stock?.hp || 0}cv
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Fabricante</label>
                    <select
                        value={selectedMake}
                        onChange={(e) => {
                            setSelectedMake(e.target.value);
                            setSelectedModel("");
                            setSelectedYear("");
                            onUpdate(participant.tempId, { id: "" });
                        }}
                        className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none"
                    >
                        <option value="">Selecione...</option>
                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Modelo</label>
                    <select
                        disabled={!selectedMake}
                        value={selectedModel}
                        onChange={(e) => {
                            setSelectedModel(e.target.value);
                            setSelectedYear("");
                            onUpdate(participant.tempId, { id: "" });
                        }}
                        className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 outline-none disabled:opacity-50"
                    >
                        <option value="">-</option>
                        {models.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Ano</label>
                    <select
                        disabled={!selectedModel}
                        value={selectedYear}
                        onChange={(e) => {
                            setSelectedYear(Number(e.target.value));
                            onUpdate(participant.tempId, { id: "" });
                        }}
                        className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 outline-none disabled:opacity-50"
                    >
                        <option value="">-</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Versão</label>
                    <select
                        disabled={!selectedYear}
                        value={participant.id || ""}
                        onChange={(e) => onUpdate(participant.tempId, { id: e.target.value })}
                        className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 outline-none disabled:opacity-50"
                    >
                        <option value="">Selecione a versão...</option>
                        {versions.map(v => <option key={v.id} value={v.id}>{v.version}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-1 mb-3 w-full">
                {car?.specs && Object.keys(car.specs).filter(stg => stg !== 'stage3')
                    .sort((a) => (a === 'stock' ? -1 : 1))
                    .map((stg) => (
                        <button
                            key={stg}
                            onClick={() => onUpdate(participant.tempId, { stage: stg as StageType })}
                            className={`text-[9px] py-1 rounded uppercase font-bold transition-all 
                                ${participant.stage === stg ? 'bg-[#6319F7] text-white' : 'bg-gray-100 text-gray-500'}`}
                        >
                            {stg === 'stock' ? 'Stock' : stg.replace('stage', 'S')}
                        </button>
                    ))
                }
            </div>
        </div>
    );
};