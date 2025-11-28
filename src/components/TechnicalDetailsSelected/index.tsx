import { Activity, Camera, Check, Grid, X } from "lucide-react";
import { useState } from "react";
import { Car } from "../Main/data";
import { Label } from "../Label";
import { SectionTitle } from "../SectionTitle";

interface TechnicalDetailsProps {
  data: Car[]
}
export const TechnicalDetailsSelected = ({ data }: TechnicalDetailsProps) => {
  const [selectedCar, setSelectedCar] = useState<string>(data[0].id);
  const car = data.find(c => c.id === selectedCar)!;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 pb-1.5">Detalhes Tecnicos</h2>
        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Selecione o Carro</label>
        <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full bg-gray-50 text-gray-900 p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6319F7] font-bold">
          {data.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="space-y-2">
        <SectionTitle><Camera size={16} className="text-[#6319F7]" /> Galeria de Fotos</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {car.photos.map((photo, idx) => (
            <div key={idx} className={`rounded-lg overflow-hidden border border-gray-200 h-24 ${idx === 0 ? 'col-span-2 md:col-span-3 h-48' : ''}`}>
              <img
                src={photo}
                alt={`${car.name} ${idx}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = `https://placehold.co/400x300/4F46E5/fff?text=Foto+${idx}`; }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
          <Activity size={18} className="text-[#6319F7]" />
          <h3 className="font-bold text-gray-800">Ficha Técnica (Motor Stock)</h3>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><Label>Marca</Label><div className="text-xl font-bold text-gray-800">{car.make}</div></div>
          <div><Label>Modelo</Label><div className="text-xl font-bold text-gray-800">{car.model}</div></div>
          <div><Label>Ano</Label><div className="text-xl font-bold text-gray-800">{car.year}</div></div>
          <div><Label>FIPE</Label><div className="text-xl font-bold text-gray-800">{car.fipe}</div></div>
          <div className="col-span-2 sm:col-span-1"><Label>Potência</Label><div className="text-xl font-bold text-[#6319F7]">{car.specs.stock.hp} <span className="text-sm text-gray-400 font-normal">cv</span></div></div>
          <div className="col-span-2 sm:col-span-1"><Label>Torque</Label><div className="text-xl font-bold text-gray-800">{car.specs.stock.torque} <span className="text-sm text-gray-400 font-normal">kgfm</span></div></div>
          <div className="col-span-2 sm:col-span-1"><Label>0-100 km/h</Label><div className="text-xl font-bold text-gray-800">{car.specs.stock.zeroToHundred} <span className="text-sm text-gray-400 font-normal">s</span></div></div>
          <div className="col-span-2 sm:col-span-1"><Label>Peso</Label><div className="text-xl font-bold text-gray-800">{car.weight} <span className="text-sm text-gray-400 font-normal">kg</span></div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2"><Grid size={18} className="text-[#6319F7]" /><h3 className="font-bold text-gray-800">Lista de Equipamentos</h3></div>
        <div>
          {Object.entries(car.equipment).map(([item, hasItem]) => (
            <div key={item} className="p-3 flex justify-between items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
              <span className={`text-sm font-medium ${hasItem ? 'text-gray-800' : 'text-gray-400 line-through'}`}>{item}</span>
              {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-300" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};