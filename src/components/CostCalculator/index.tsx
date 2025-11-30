import { useEffect, useMemo, useState } from "react";
import { Card } from "../Card";
import { Label } from "../Label";
import { Select } from "../Select";
import { Car } from "../Main/data";
import { DollarSign } from "lucide-react";

export const CostCalculator = ({ cars, rawCars }: { rawCars: Car[], cars: Car[] }) => {
  const [selectedCarId, setSelectedCarId] = useState<string>(cars[0].id);
  const car = useMemo(() => cars.find(c => c.id === selectedCarId) || cars[0], [selectedCarId]);

  // States for cascading dropdowns
  const [selectedMake, setSelectedMake] = useState(car.make);
  const [selectedModel, setSelectedModel] = useState(car.model);
  const [selectedYear, setSelectedYear] = useState(car.year);

  // Initial sync when car changes externally (if ever needed)
  useEffect(() => {
    setSelectedMake(car.make);
    setSelectedModel(car.model);
    setSelectedYear(car.year);
  }, [car.make, car.model, car.year, selectedCarId]); // Re-sync when selected ID changes

  // Derived lists
  const makes = useMemo(() => [...new Set(rawCars.map(c => c.make))], []);
  const models = useMemo(() => [...new Set(rawCars.filter(c => c.make === selectedMake).map(c => c.model))], [selectedMake]);
  const years = useMemo(() => [...new Set(rawCars.filter(c => c.make === selectedMake && c.model === selectedModel).map(c => c.year))], [selectedMake, selectedModel]);
  const versions = useMemo(() => rawCars.filter(c => c.make === selectedMake && c.model === selectedModel && c.year === selectedYear), [selectedMake, selectedModel, selectedYear]);

  // Handlers
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMake = e.target.value;
    setSelectedMake(newMake);
    // Auto-select first valid model
    const firstModel = rawCars.find(c => c.make === newMake);
    if (firstModel) {
      setSelectedModel(firstModel.model);
      setSelectedYear(firstModel.year);
      setSelectedCarId(firstModel.id);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    const firstYear = rawCars.find(c => c.make === selectedMake && c.model === newModel);
    if (firstYear) {
      setSelectedYear(firstYear.year);
      setSelectedCarId(firstYear.id);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = Number(e.target.value);
    setSelectedYear(newYear);
    const firstVersion = rawCars.find(c => c.make === selectedMake && c.model === selectedModel && c.year === newYear);
    if (firstVersion) {
      setSelectedCarId(firstVersion.id);
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarId(e.target.value);
  };

  const ipva = car.price * 0.04;
  const insurance = car.price * 0.05;
  const fuelPrice = 5.80;
  const consumption = 9.0;
  const kmMonthly = 1000;
  const fuelMonthly = (kmMonthly / consumption) * fuelPrice;
  const maintenanceMonthly = 300;
  const totalMonthly = (ipva / 12) + (insurance / 12) + fuelMonthly + maintenanceMonthly;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><div className="p-2 bg-green-100 rounded-lg text-green-600"><DollarSign size={20} /></div>Simulador Mensal</h2>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="col-span-2">
          <Label>Fabricante</Label>
          <Select value={selectedMake} onChange={handleMakeChange}>
            {makes.map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
        </div>
        <div>
          <Label>Modelo</Label>
          <Select value={selectedModel} onChange={handleModelChange}>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </Select>
        </div>
        <div>
          <Label>Ano</Label>
          <Select value={selectedYear} onChange={handleYearChange}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </Select>
        </div>
        <div className="col-span-2">
          <Label>Versão</Label>
          <Select value={selectedCarId} onChange={handleVersionChange}>
            {versions.map(v => <option key={v.id} value={v.id}>{v.version}</option>)}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex justify-between text-sm text-gray-500"><span>IPVA (Mensalizado)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ipva / 12)}</span></div>
        <div className="flex justify-between text-sm text-gray-500"><span>Seguro (Estimado)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(insurance / 12)}</span></div>
        <div className="flex justify-between text-sm text-gray-500"><span>Combustível ({kmMonthly}km)</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fuelMonthly)}</span></div>
        <div className="flex justify-between text-sm text-gray-500"><span>Provisão Manutenção</span><span className="font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maintenanceMonthly)}</span></div>
      </div>
      <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-500">Total Mensal</span>
        <span className="text-3xl font-black text-[#6319F7]">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalMonthly)}</span>
      </div>
    </Card>
  );
};