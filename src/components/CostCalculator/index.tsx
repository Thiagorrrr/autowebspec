"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "../Card";
import { Label } from "../Label";
import { Select } from "../Select";
import { useCars } from "@/hooks/queries/useCars";
import { Loading } from "./loading";
import { SectionTitle } from "../SectionTitle";

export const CostCalculator = () => {
  const { data, isLoading, error } = useCars();
  const cars = useMemo(() => data ?? [], [data]);

  const [selectedCarId, setSelectedCarId] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  // modo edição
  const [isEditing, setIsEditing] = useState(false);

  // valores editáveis
  const [price, setPrice] = useState(0);
  const [consumption, setConsumption] = useState(9);
  const [kmMonthly, setKmMonthly] = useState(1000);
  const [fuelPrice, setFuelPrice] = useState(5.8);
  const [ipvaRate, setIpvaRate] = useState(0.04); // porcentagem
  const [insuranceAnnual, setInsuranceAnnual] = useState(0);
  const [maintenanceMonthly, setMaintenanceMonthly] = useState(300);
  const [financingMonthly, setFinancingMonthly] = useState(0);

  const INSURANCE_RATE_DEFAULT = 0.05;

  //
  // inicialização do carro
  //
  useEffect(() => {
    if (cars.length && !selectedCarId) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, selectedCarId]);

  const car = useMemo(
    () => cars.find((c) => c.id === selectedCarId),
    [cars, selectedCarId]
  );

  //
  // quando troca o carro → valores padrão do site
  //
  useEffect(() => {
    if (!car) return;

    setSelectedMake(car.make);
    setSelectedModel(car.model);
    setSelectedYear(car.year);

    setPrice(Math.min(Math.max(0, car.price), 1000000));
    setConsumption(Math.min(Math.max(0, 9), 100));
    setKmMonthly(Math.min(Math.max(0, 1000), 50000));
    setFuelPrice(Math.min(Math.max(0, 5.8), 20));
    setIpvaRate(Math.min(Math.max(0, 0.04), 0.2)); // 4%
    setInsuranceAnnual(Math.min(Math.max(0, car.price * INSURANCE_RATE_DEFAULT), 500000));
    setMaintenanceMonthly(Math.min(Math.max(0, 300), 5000));
    setFinancingMonthly(Math.min(Math.max(0, 0), 100000));
    setIsEditing(false);
  }, [car]);

  //
  // selects
  //
  const makes = useMemo(() => [...new Set(cars.map((c) => c.make))], [cars]);
  const models = useMemo(
    () =>
      [...new Set(cars.filter((c) => c.make === selectedMake).map((c) => c.model))],
    [cars, selectedMake]
  );
  const years = useMemo(
    () =>
      [
        ...new Set(
          cars
            .filter((c) => c.make === selectedMake && c.model === selectedModel)
            .map((c) => c.year)
        ),
      ],
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

  //
  // handlers
  //
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

  //
  // reset para valores do site
  //
  const resetValues = () => {
    if (!car) return;

    setPrice(Math.min(Math.max(0, car.price), 1000000));
    setConsumption(Math.min(Math.max(0, 9), 100));
    setKmMonthly(Math.min(Math.max(0, 1000), 50000));
    setFuelPrice(Math.min(Math.max(0, 5.8), 20));
    setIpvaRate(Math.min(Math.max(0, 0.04), 0.2)); // 4%
    setInsuranceAnnual(Math.min(Math.max(0, car.price * INSURANCE_RATE_DEFAULT), 500000));
    setMaintenanceMonthly(Math.min(Math.max(0, 300), 5000));
    setFinancingMonthly(Math.min(Math.max(0, 0), 100000));
  };

  //
  // loading / error
  //
  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao carregar carros.</p>;
  if (!car) return <p>Nenhum carro encontrado.</p>;

  //
  // cálculos
  //
  const ipvaMonthly = (price * ipvaRate) / 12;
  const insuranceMonthly = insuranceAnnual / 12;
  const fuelMonthly = (kmMonthly / consumption) * fuelPrice;
  const totalMonthly =
    ipvaMonthly +
    insuranceMonthly +
    fuelMonthly +
    maintenanceMonthly +
    financingMonthly;

  return (
    <Card className="p-6 mt-8">
      <SectionTitle>Simulador Mensal</SectionTitle>

      {/* SELECTS */}
      <div className="grid grid-cols-2 gap-2 mb-6">
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

      {/* BOTÕES */}
      <div className="flex justify-end gap-2 mb-6">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border rounded-lg text-sm font-bold"
          >
            Editar valores
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-[#6319F7] text-white rounded-lg text-sm font-bold"
            >
              Calcular
            </button>
            <button
              onClick={resetValues}
              className="px-4 py-2 border rounded-lg text-sm font-bold"
            >
              Resetar
            </button>
          </>
        )}
      </div>

      {/* CAMPOS EDITÁVEIS */}
      {isEditing && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <TextInput label="Preço do carro" value={price} onChange={setPrice} max={1000000} />
          <TextInput label="Km mensal" value={kmMonthly} onChange={setKmMonthly} max={50000} />
          <TextInput label="Consumo (km/l)" value={consumption} onChange={setConsumption} max={100} />
          <TextInput label="Preço do combustível" value={fuelPrice} onChange={setFuelPrice} max={20} />
          <TextInput label="IPVA (%)" value={ipvaRate * 100} onChange={(v) => setIpvaRate(v / 100)} max={20} />
          <TextInput label="Seguro anual" value={insuranceAnnual} onChange={setInsuranceAnnual} max={500000} />
          <TextInput label="Manutenção mensal" value={maintenanceMonthly} onChange={setMaintenanceMonthly} max={5000} />
          <TextInput label="Financiamento mensal" value={financingMonthly} onChange={setFinancingMonthly} max={100000} />
        </div>
      )}

      {/* RESULTADOS */}
      <div className="flex flex-col gap-4 mb-8">
        <Row label="IPVA (Anual ÷ 12)" value={ipvaMonthly} />
        <Row label="Seguro (Anual ÷ 12)" value={insuranceMonthly} />
        <Row label={`Combustível (${kmMonthly} km)`} value={fuelMonthly} />
        <Row label="Manutenção" value={maintenanceMonthly} />
        <Row label="Financiamento" value={financingMonthly} />
      </div>

      <div className="border-t border-dashed pt-6 flex justify-between">
        <span className="font-bold text-gray-500">Total Mensal</span>
        <span className="text-3xl font-black text-[#6319F7]">
          {totalMonthly.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </span>
      </div>
    </Card>
  );
};

//
// auxiliares
//
const Row = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between text-sm">
    <span>{label}</span>
    <span className="font-bold">
      {value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
    </span>
  </div>
);

const TextInput = ({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(",", "."); // aceita vírgula como decimal
    if (/^\d*\.?\d*$/.test(raw)) {
      const numeric = raw === "" ? 0 : Number(raw);
      onChange(Math.min(Math.max(0, numeric), max));
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 text-sm"
        placeholder="0"
      />
    </div>
  );
};
