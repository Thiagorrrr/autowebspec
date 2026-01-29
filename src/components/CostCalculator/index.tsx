"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "../Card";
import { Label } from "../Label";
import { Select } from "../Select";
import { useCars } from "@/hooks/queries/useCars";
import { Loading } from "./loading";
import { SectionTitle } from "../SectionTitle";
import { RotateCcw, Gauge, DollarSign } from "lucide-react";

export const CostCalculator = () => {
  const { data, isLoading, error } = useCars();
  const cars = useMemo(() => data ?? [], [data]);

  const [selectedCarId, setSelectedCarId] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  const [isEditing, setIsEditing] = useState(false);

  // Valores editáveis
  const [price, setPrice] = useState(0);
  const [consumption, setConsumption] = useState(9);
  const [kmMonthly, setKmMonthly] = useState(1000);
  const [fuelPrice, setFuelPrice] = useState(5.8);
  const [ipvaRate, setIpvaRate] = useState(0.04);
  const [insuranceAnnual, setInsuranceAnnual] = useState(0);
  const [maintenanceMonthly, setMaintenanceMonthly] = useState(300);
  const [financingMonthly, setFinancingMonthly] = useState(0);

  const INSURANCE_RATE_DEFAULT = 0.05;

  useEffect(() => {
    if (cars.length && !selectedCarId) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, selectedCarId]);

  const car = useMemo(
    () => cars.find((c) => c.id === selectedCarId),
    [cars, selectedCarId]
  );

  useEffect(() => {
    if (!car) return;

    setSelectedMake(car.make);
    setSelectedModel(car.model);
    setSelectedYear(car.year);

    setPrice(car.price || 0);
    setConsumption(9);
    setKmMonthly(1000);
    setFuelPrice(5.8);
    setIpvaRate(0.04);
    setInsuranceAnnual(car.price * INSURANCE_RATE_DEFAULT);
    setMaintenanceMonthly(300);
    setFinancingMonthly(0);
    setIsEditing(false);
  }, [car]);

  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))], [cars]);
  const models = useMemo(
    () => [...new Set(cars.filter((c) => c.make === selectedMake).map((c) => c.model))],
    [cars, selectedMake]
  );
  const years = useMemo(
    () => [...new Set(cars.filter((c) => c.make === selectedMake && c.model === selectedModel).map((c) => c.year))],
    [cars, selectedMake, selectedModel]
  );
  const versions = useMemo(
    () => cars.filter((c) => c.make === selectedMake && c.model === selectedModel && c.year === selectedYear),
    [cars, selectedMake, selectedModel, selectedYear]
  );

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const make = e.target.value;
    setSelectedMake(make);
    const first = cars.find((c) => c.make === make);
    if (first) {
      setSelectedModel(first.model);
      setSelectedYear(first.year);
      setSelectedCarId(first.id);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setSelectedModel(model);
    const first = cars.find((c) => c.make === selectedMake && c.model === model);
    if (first) {
      setSelectedYear(first.year);
      setSelectedCarId(first.id);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    const first = cars.find((c) => c.make === selectedMake && c.model === selectedModel && c.year === year);
    if (first) setSelectedCarId(first.id);
  };

  const resetValues = () => {
    if (!car) return;
    setPrice(car.price || 0);
    setConsumption(9);
    setKmMonthly(1000);
    setFuelPrice(5.8);
    setIpvaRate(0.04);
    setInsuranceAnnual(car.price * INSURANCE_RATE_DEFAULT);
    setMaintenanceMonthly(300);
    setFinancingMonthly(0);
  };

  if (isLoading) return <Loading />;
  if (error) return <p className="p-10 text-center font-bold text-red-500">Erro ao carregar dados.</p>;
  if (!car) return null;

  const ipvaMonthly = (price * ipvaRate) / 12;
  const insuranceMonthly = insuranceAnnual / 12;
  const fuelMonthly = (kmMonthly / consumption) * fuelPrice;
  const totalMonthly = ipvaMonthly + insuranceMonthly + fuelMonthly + maintenanceMonthly + financingMonthly;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <SectionTitle
        subtitle="Gestão Financeira"
        description="Projete seus gastos fixos e variáveis. Calcule combustível, depreciação e manutenção para entender o custo real de rodagem do veículo."
      >
        Simulador <br /> Mensal
      </SectionTitle>

      <Card className="p-6 md:p-8 mt-4 border-none shadow-2xl bg-white overflow-hidden relative">

        {/* SEÇÃO 1: SELEÇÃO DO VEÍCULO */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-5 bg-[#6319F7] rounded-full"></div>
            <div>
              <h3 className="font-black uppercase text-sm tracking-tight text-gray-900">Configuração do Veículo</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Identificação na base de dados</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label>Fabricante</Label>
              <Select value={selectedMake} onChange={handleMakeChange}>
                {makes.map((m) => <option key={m} value={m}>{m}</option>)}
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Modelo</Label>
              <Select value={selectedModel} onChange={handleModelChange}>
                {models.map((m) => <option key={m} value={m}>{m}</option>)}
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Ano</Label>
              <Select value={selectedYear} onChange={handleYearChange}>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Versão</Label>
              <Select value={selectedCarId} onChange={(e) => setSelectedCarId(e.target.value)}>
                {versions.map((v) => <option key={v.id} value={v.id}>{v.version}</option>)}
              </Select>
            </div>
          </div>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="flex justify-between items-center py-4 border-y border-gray-50 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isEditing ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              <Gauge size={14} /> {isEditing ? "Fechar Edição" : "Ajustar Valores"}
            </button>
            {isEditing && (
              <button
                onClick={resetValues}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                <RotateCcw size={14} /> Resetar
              </button>
            )}
          </div>
        </div>

        {/* SEÇÃO 2: CAMPOS EDITÁVEIS (Apenas se isEditing) */}
        {isEditing && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
            <TextInput label="Preço (R$)" value={price} onChange={setPrice} max={2000000} />
            <TextInput label="Km Mensal" value={kmMonthly} onChange={setKmMonthly} max={50000} />
            <TextInput label="Consumo (Km/L)" value={consumption} onChange={setConsumption} max={100} />
            <TextInput label="Combustível (R$)" value={fuelPrice} onChange={setFuelPrice} max={20} />
            <TextInput label="IPVA (%)" value={ipvaRate * 100} onChange={(v) => setIpvaRate(v / 100)} max={20} />
            <TextInput label="Seguro Anual" value={insuranceAnnual} onChange={setInsuranceAnnual} max={500000} />
            <TextInput label="Manutenção" value={maintenanceMonthly} onChange={setMaintenanceMonthly} max={10000} />
            <TextInput label="Financiamento" value={financingMonthly} onChange={setFinancingMonthly} max={100000} />
          </div>
        )}

        {/* SEÇÃO 3: RESULTADOS TÉCNICOS */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6 text-gray-400">
            <DollarSign size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Detalhamento de Custos</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <Row label="IPVA (Mensalizado)" value={ipvaMonthly} />
            <Row label="Seguro Estimado" value={insuranceMonthly} />
            <Row label={`Combustível (${kmMonthly}km)`} value={fuelMonthly} />
            <Row label="Reserva Manutenção" value={maintenanceMonthly} />
            <Row label="Parcela Financiamento" value={financingMonthly} />
          </div>
        </div>

        {/* TOTAL FINAL - VERSÃO SUAVE */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Mensal Estimado</h4>
            <p className="text-xs text-gray-500 font-medium italic">Baseado no perfil {kmMonthly}km/mês</p>
          </div>
          <div className="text-3xl font-black text-[#6319F7] tracking-tighter">
            {totalMonthly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
        </div>
      </Card>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-200/50 last:border-0">
    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">{label}</span>
    <span className="font-black text-gray-900 text-sm">
      {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    </span>
  </div>
);

const TextInput = ({ label, value, onChange, max }: { label: string; value: number; onChange: (v: number) => void; max: number }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(",", ".");
    if (/^\d*\.?\d*$/.test(raw)) {
      const numeric = raw === "" ? 0 : Number(raw);
      onChange(Math.min(Math.max(0, numeric), max));
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <Label >{label}</Label>
      <input
        type="text"
        value={value || ""}
        onChange={handleChange}
        className="bg-white border border-gray-200 rounded-xl px-3 py-3 text-sm font-bold focus:ring-2 focus:ring-[#6319F7] outline-none transition-all"
        placeholder="0.00"
      />
    </div>
  );
};