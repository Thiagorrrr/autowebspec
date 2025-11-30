"use client"
import { Car } from "@/components/Main/data";
import { Participant, StageType } from "@/types/types";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from 'next/image';
interface DetailedCarSelectorProps {
    rawCars: Car[];
    cars: Car[];
    participant: Participant;
    onUpdate: (tempId: number, newData: Partial<Participant>) => void;
    onRemove: (tempId: number) => void;
    showRemove: boolean;
}

export const DetailedCarSelector: React.FC<DetailedCarSelectorProps> = ({ rawCars, cars, participant, onUpdate, onRemove, showRemove }) => {
    const car = cars.find(c => c.id === participant.id)!;
    const [selectedMake, setSelectedMake] = useState(car.make);
    const [selectedModel, setSelectedModel] = useState(car.model);
    const [selectedYear, setSelectedYear] = useState(car.year);

    const makes = [...new Set(rawCars.map(c => c.make))];
    const models = [...new Set(rawCars.filter(c => c.make === selectedMake).map(c => c.model))];
    const years = [...new Set(rawCars.filter(c => c.make === selectedMake && c.model === selectedModel).map(c => c.year))];
    const versions = rawCars.filter(c => c.make === selectedMake && c.model === selectedModel && c.year == selectedYear);

    useEffect(() => {
        setSelectedMake(car.make);
        setSelectedModel(car.model);
        setSelectedYear(car.year);
    }, [car.make, car.model, car.year, participant.id]);

    const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMake = e.target.value;
        setSelectedMake(newMake);
        const firstCar = rawCars.find(c => c.make === newMake);
        if (firstCar) onUpdate(participant.tempId, { id: firstCar.id });
    };
    const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newModel = e.target.value;
        setSelectedModel(newModel);
        const firstCar = rawCars.find(c => c.make === selectedMake && c.model === newModel);
        if (firstCar) onUpdate(participant.tempId, { id: firstCar.id });
    };
    const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => { onUpdate(participant.tempId, { id: e.target.value }); };
    const handleStageChange = (stage: StageType) => { onUpdate(participant.tempId, { stage }); };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full relative group">
            {showRemove && (
                <button onClick={() => onRemove(participant.tempId)} className="absolute -top-2 -right-2 bg-red-100 text-red-500 rounded-full p-1 shadow-sm hover:bg-red-500 hover:text-white transition-colors z-10"><X size={14} /></button>
            )}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Fabricante</label>
                    <select value={selectedMake} onChange={handleMakeChange} className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none">
                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Modelo</label>
                    <select value={selectedModel} onChange={handleModelChange} className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none">
                        {models.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Ano</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none">
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Versão</label>
                    <select value={car.id} onChange={handleVersionChange} className="w-full bg-gray-50 text-sm font-bold p-2 rounded border border-gray-200 focus:border-[#6319F7] outline-none text-ellipsis">
                        {versions.map(v => <option key={v.id} value={v.id}>{v.version}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-1 mb-3 w-full">
                {(['stock', 'stage1', 'stage2'] as StageType[]).map(stg => (
                    <button key={stg} onClick={() => handleStageChange(stg)} className={`text-[9px] py-1 rounded uppercase font-bold transition-all ${participant.stage === stg ? 'bg-[#6319F7] text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                        {stg === 'stock' ? 'Stock' : stg.replace('stage', 'S')}
                    </button>
                ))}
            </div>
            <div className="flex-1 flex items-end w-full mt-2">
                <div className="relative w-full h-40 rounded-lg overflow-hidden group-hover:shadow-md transition-all">
                    <Image src={`/${car.image}`} alt={car.image.replace("-", " ")} fill className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white font-bold text-[10px]">{car.specs[participant.stage].hp}cv</div>
                </div>
            </div>
        </div>
    );
};