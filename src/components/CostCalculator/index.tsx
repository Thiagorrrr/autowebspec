import React, { useState } from "react";
import { Car } from "../Main/data";
import { DollarSign } from "lucide-react";

interface CostCalculatorProps {
    data: Car[]
}

export const CostCalculator = ({ data }: CostCalculatorProps) => {
  const [selectedCar, setSelectedCar] = useState<string>(data[0].id);
  const car = data.find(c => c.id === selectedCar)!;
  const ipva = car.price * 0.04;
  const insurance = car.price * 0.05;
  const fuelPrice = 5.80;
  const consumption = 9.0;
  const kmMonthly = 1000;
  const fuelMonthly = (kmMonthly / consumption) * fuelPrice;
  const maintenanceMonthly = 300;
  const totalMonthly = (ipva / 12) + (insurance / 12) + fuelMonthly + maintenanceMonthly;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <DollarSign size={20} />
        </div>Simulador Mensal</h2>
      <div className="mb-6">
        <label className="text-gray-500 text-xs font-bold uppercase mb-2 block">Selecione o Veículo</label>
        <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)} className="w-full bg-gray-50 text-gray-900 p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#6319F7]">
          {data.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm text-gray-600"><span>IPVA (Mensalizado)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ipva / 12)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Seguro (Estimado)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(insurance / 12)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Combustível ({kmMonthly}km)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fuelMonthly)}</span></div>
        <div className="flex justify-between text-sm text-gray-600"><span>Provisão Manutenção</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maintenanceMonthly)}</span></div>
      </div>
      <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-700">Total Mensal</span>
        <span className="text-3xl font-black text-[#6319F7]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMonthly)}</span>
      </div>
    </div>
  );
};