"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "../Card";
import { Label } from "../Label";
import { Select } from "../Select";
import { useCars } from "@/hooks/queries/useCars";

export const CostCalculator = () => {
  const { data, isLoading, error } = useCars();

  const cars = useMemo(() => data ?? [], [data]);
  const [selectedCarId, setSelectedCarId] = useState<string>("");
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


  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar carros.</p>;
  if (!car) return <p>Nenhum carro encontrado.</p>;

  //
  // CÁLCULOS
  //
  const ipva = car.price * 0.04;
  const insurance = car.price * 0.05;
  const fuelPrice = 5.8;
  const consumption = 9;
  const kmMonthly = 1000;

  const fuelMonthly = (kmMonthly / consumption) * fuelPrice;
  const maintenanceMonthly = 300;

  const totalMonthly =
    ipva / 12 +
    insurance / 12 +
    fuelMonthly +
    maintenanceMonthly;

  //
  // UI
  //
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        Simulador Mensal
      </h2>
      <Label>Selecione o Carro</Label>
      {/* SELECTS */}
      <div className="grid grid-cols-2 gap-2 mb-6 pt-4">
        {/* FABRICANTE */}
        <div className="col-span-2">
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

      {/* PREÇOS */}
      <div className="flex flex-col gap-4 mb-8">
        <Row label="IPVA (Mensalizado)" value={ipva / 12} />
        <Row label="Seguro (Estimado)" value={insurance / 12} />
        <Row label={`Combustível (${kmMonthly}km)`} value={fuelMonthly} />
        <Row label="Provisão Manutenção" value={maintenanceMonthly} />
      </div>

      {/* TOTAL */}
      <div className="border-t border-dashed border-gray-200 pt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-500">Total Mensal</span>
        <span className="text-3xl font-black text-[#6319F7]">
          {totalMonthly.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </Card>
  );
};

const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between text-sm text-gray-500">
    <span>{label}</span>
    <span className="font-bold text-gray-800">
      {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    </span>
  </div>
);
