"use client"
import { Activity, Camera, Check, CheckCircle, Grid, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Label } from "../Label";
import { SectionTitle } from "../SectionTitle";
import Image from "next/image";
import { useCars } from "@/hooks/queries/useCars";
import { Select } from "../Select";
import { Loading } from "./loading";


export const TechnicalDetailsSelected = () => {
  const { data, isLoading, error } = useCars();


  const cars = useMemo(() => data ?? [], [data]);

  const [selectedCarId, setSelectedCarId] = useState<string>();
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  useEffect(() => {
    if (cars.length > 0 && !selectedCarId) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, selectedCarId]);


  const car = useMemo(() => {
    return cars.find((c) => c.id === selectedCarId);
  }, [cars, selectedCarId]);


  useEffect(() => {
    if (!car) return;
    setSelectedMake(car.make);
    setSelectedModel(car.model);
    setSelectedYear(car.year);
  }, [car]);

  const makes = useMemo(
    () => [...new Set(cars.map((c) => c.make))],
    [cars]
  );

  const models = useMemo(
    () =>
      [...new Set(cars.filter((c) => c.make === selectedMake).map((c) => c.model))],
    [cars, selectedMake]
  );

  const years = useMemo(
    () =>
      [...new Set(
        cars
          .filter((c) => c.make === selectedMake && c.model === selectedModel)
          .map((c) => c.year)
      )],
    [cars, selectedMake, selectedModel]
  );

  const versions = useMemo(
    () =>
      cars.filter(
        (c) =>
          c.make === selectedMake &&
          c.model === selectedModel &&
          c.year === selectedYear
      ),
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

    const first = cars.find(
      (c) => c.make === selectedMake && c.model === model
    );

    if (first) {
      setSelectedYear(first.year);
      setSelectedCarId(first.id);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    setSelectedYear(year);

    const first = cars.find(
      (c) =>
        c.make === selectedMake &&
        c.model === selectedModel &&
        c.year === year
    );

    if (first) {
      setSelectedCarId(first.id);
    }
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCarId(e.target.value);
  };

  if (isLoading) return <Loading />
  if (error) return <p>Erro ao carregar</p>;
  if (!car) return <div>Carro não encontrado.</div>;

  return (
    <div className="space-y-6 mt-8">
      <div className="flex  flex-col bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 pb-6">Detalhes Tecnicos</h2>
        <Label>Selecione o Carro</Label>
        <div className="grid grid-cols-2 gap-2 mb-6 pt-4">
          <div className=" col-span-2 ">
            <Label>Fabricante</Label>
            <Select value={selectedMake} onChange={handleMakeChange}>
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </div>

          {/* MODELO */}
          <div>
            <Label>Modelo</Label>
            <Select value={selectedModel} onChange={handleModelChange}>
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
          </div>

          {/* ANO */}
          <div>
            <Label>Ano</Label>
            <Select value={selectedYear} onChange={handleYearChange}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </div>

          {/* VERSÕES */}
          <div className="col-span-2">
            <Label>Versão</Label>
            <Select value={selectedCarId} onChange={handleVersionChange}>
              {versions.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.version}
                </option>
              ))}
            </Select>
          </div>

        </div>
      </div>

      <div className="space-y-2">
        <SectionTitle><Camera size={16} className="text-[#6319F7]" /> Galeria de Fotos</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {car.photos.map((photo, idx) => (
            <div
              key={idx}
              className={`rounded-lg overflow-hidden border border-gray-200 sm:h-[400px] ${idx === 0 ? 'col-span-2 md:col-span-3 h-48' : ''}`}
            >
              <Image
                src={`/${photo}`}
                alt={`${car.make} ${idx}`}
                width={300}
                height={400}
                className="w-full h-full object-cover"
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
        <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
          <Grid size={18} className="text-[#6319F7]" />
          <h3 className="font-bold text-gray-800">Lista de Equipamentos</h3>
        </div>
        <div className="p-2">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden gap-1">
            {
              Object.entries(car.equipment).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <div className="bg-gray-50 p-3 border-b border-gray-100 flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#6319F7]" />
                    <h3 className="font-bold text-gray-800">{category}</h3>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    {Object.entries(items).map(([item, hasItem]) => (
                      <div key={item} className="p-3 flex justify-between items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <span className={`text-sm font-medium ${hasItem ? 'text-gray-800' : 'text-gray-600'}`}>{item}</span>
                        {hasItem ? <Check size={16} className="text-[#6319F7]" /> : <X size={16} className="text-gray-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};