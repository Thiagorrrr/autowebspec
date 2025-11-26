import { Activity, Camera, Check, Grid, X } from "lucide-react";
import { useState } from "react";
import { Car } from "../Main/data";

interface TechnicalDetailsProps {
    data: Car[]
}
export const TechnicalDetails = ({ data }: TechnicalDetailsProps) => {
  const [selectedCar, setSelectedCar] = useState<string>(data[0].id);
  const car = data.find(c => c.id === selectedCar)!;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Selecione o Carro</label>
          <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full bg-gray-50 text-gray-900 p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6319F7] font-bold">
            {data.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
      </div>
      <div className="space-y-2">
          <h3 className="flex items-center gap-2 font-bold text-gray-800 text-sm uppercase pb-2 pt-2"><Camera size={16} className="text-[#6319F7]" /> Galeria de Fotos</h3>
          <div className="grid grid-cols-3 gap-2">
              {car.photos.map((photo, idx) => (
                  <div key={idx} className={`rounded-lg overflow-hidden border border-gray-200 shadow-sm h-24 ${idx === 0 ? 'col-span-3 h-48' : ''}`}>
                      <img src={photo} alt={`${car.name} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
              ))}
          </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
            <Activity size={18} className="text-[#6319F7]" />
            <h3 className="font-bold text-gray-800">Ficha Técnica (Motor Stock)</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4">
            <div><div className="text-xs text-gray-400 uppercase font-bold">Potência</div><div className="text-xl font-bold text-gray-800">{car.specs.stock.hp} <span className="text-sm text-gray-400 font-normal">cv</span></div></div>
            <div><div className="text-xs text-gray-400 uppercase font-bold">Torque</div><div className="text-xl font-bold text-gray-800">{car.specs.stock.torque} <span className="text-sm text-gray-400 font-normal">kgfm</span></div></div>
            <div><div className="text-xs text-gray-400 uppercase font-bold">0-100 km/h</div><div className="text-xl font-bold text-gray-800">{car.specs.stock.zeroToHundred} <span className="text-sm text-gray-400 font-normal">s</span></div></div>
            <div><div className="text-xs text-gray-400 uppercase font-bold">Peso</div><div className="text-xl font-bold text-gray-800">{car.weight} <span className="text-sm text-gray-400 font-normal">kg</span></div></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
         <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2"><Grid size={18} className="text-[#6319F7]" /><h3 className="font-bold text-gray-800">Lista de Equipamentos</h3></div>
        <div className="divide-y divide-gray-50">
            {Object.entries(car.equipment).map(([item, hasItem]) => (
                <div key={item} className="p-3 flex justify-between items-center hover:bg-gray-50">
                    <span className={`text-sm font-medium ${hasItem ? 'text-gray-700' : 'text-gray-400 line-through'}`}>{item}</span>
                    {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-300" />}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};