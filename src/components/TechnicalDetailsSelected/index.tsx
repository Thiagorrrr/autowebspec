"use client"
import { useEffect, useMemo, useState } from "react";
import { Label } from "../Label";
import { useCars } from "@/hooks/queries/useCars";
import { Select } from "../Select";
import { Loading } from "./loading";
import { CarDetails } from "../CarDetails";
import { SectionTitle } from "../SectionTitle";
interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  version: string;
  // adicione outros campos que CarDetails utilize, se necessário
}
export const TechnicalDetailsSelected = () => {
  const { data, isLoading, error } = useCars();
  const cars = useMemo(() => data ?? [], [data]);

  const [selectedCarId, setSelectedCarId] = useState<string>("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  const createSlug = (car: Car): string => {
    const part = (text: string, allowDots = false) => {
      const regex = allowDots ? /[^\w\s.-]/g : /[^\w\s-]/g;
      return text?.toString().toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(regex, "")             // Remove especiais (mantém ponto se allowDots for true)
        .trim()
        .replace(/\s+/g, "-");          // Espaços para dashes
    };

    return `${part(car.make)}-${part(car.model)}-${car.year}-${part(car.version, true)}`;
  };

  // 1. Efeito para ler a URL e encontrar o carro correspondente
  useEffect(() => {
    if (cars.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const urlSlug = params.get("carro");

    // Tenta achar o carro que gera o mesmo slug da URL
    const carBySlug = cars.find(c => createSlug(c) === urlSlug);

    // Se não achar pela URL, pega o primeiro
    const targetCar = carBySlug || cars[0];

    if (targetCar) {
      setSelectedCarId(targetCar.id);
      setSelectedMake(targetCar.make);
      setSelectedModel(targetCar.model);
      setSelectedYear(targetCar.year);
    }
  }, [cars]);

  // 2. Atualiza a URL sempre que o carro mudar
  const syncUrl = (car: Car) => {
    if (!car) return;
    const slug = createSlug(car);
    const url = new URL(window.location.href);
    url.searchParams.set("carro", slug);
    window.history.replaceState({}, "", url.toString());
  };

  const car = useMemo(() => {
    const found = cars.find((c) => c.id === selectedCarId) || cars[0];
    return found;
  }, [cars, selectedCarId]);

  // Handlers
  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const make = e.target.value;
    const firstMatch = cars.find((c) => c.make === make);
    if (firstMatch) {
      setSelectedMake(make);
      setSelectedModel(firstMatch.model);
      setSelectedYear(firstMatch.year);
      setSelectedCarId(firstMatch.id);
      syncUrl(firstMatch);
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    const firstMatch = cars.find((c) => c.make === selectedMake && c.model === model);
    if (firstMatch) {
      setSelectedModel(model);
      setSelectedYear(firstMatch.year);
      setSelectedCarId(firstMatch.id);
      syncUrl(firstMatch);
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const selected = cars.find(c => c.id === id);
    if (selected) {
      setSelectedCarId(id);
      syncUrl(selected);
    }
  };

  // Listas dos Selects (Memos)
  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))], [cars]);
  const models = useMemo(() =>
    [...new Set(cars.filter((c) => c.make === selectedMake).map((c) => c.model))],
    [cars, selectedMake]
  );
  const years = useMemo(() =>
    [...new Set(cars.filter((c) => c.make === selectedMake && c.model === selectedModel).map((c) => c.year))],
    [cars, selectedMake, selectedModel]
  );
  const versions = useMemo(() =>
    cars.filter((c) => c.make === selectedMake && c.model === selectedModel && c.year === selectedYear),
    [cars, selectedMake, selectedModel, selectedYear]
  );

  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao carregar</p>;
  if (!car) return null;

  return (
    <div className="space-y-6 mt-8">
      <SectionTitle
        subtitle="Engenharia e Dados"
        description="Exploração profunda de cada componente mecânico, sistemas eletrônicos e medições oficiais para uma compreensão total da máquina."
      >
        Detalhes <br /> Técnicos
      </SectionTitle>
      <div className="flex flex-col bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-5 bg-[#6319F7] rounded-full"></div>
          <div>
            <h3 className="font-black uppercase text-sm tracking-tight text-gray-900">
              Especificações de Fábrica
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Acesse a ficha técnica detalhada e dados de engenharia
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-6 pt-4">
          <div className="col-span-2">
            <Label>Fabricante</Label>
            <Select value={selectedMake} onChange={handleMakeChange}>
              {makes.map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
          </div>
          <div>
            <Label>Modelo</Label>
            <Select value={selectedModel} onChange={handleModelChange}>
              {models.map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
          </div>
          <div>
            <Label>Ano</Label>
            <Select value={selectedYear} onChange={(e) => {
              const y = Number(e.target.value);
              setSelectedYear(y);
              const match = cars.find(c => c.make === selectedMake && c.model === selectedModel && c.year === y);
              if (match) { setSelectedCarId(match.id); syncUrl(match); }
            }}>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </Select>
          </div>
          <div className="col-span-2">
            <Label>Versão</Label>
            <Select value={selectedCarId} onChange={handleVersionChange}>
              {versions.map((v) => <option key={v.id} value={v.id}>{v.version}</option>)}
            </Select>
          </div>
        </div>
      </div>
      <CarDetails {...car} />
    </div>
  );
};