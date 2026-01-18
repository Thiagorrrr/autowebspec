"use client"
import { useEffect, useMemo, useState } from "react";
import { Label } from "../Label";
import { useCars } from "@/hooks/queries/useCars";
import { Select } from "../Select";
import { Loading } from "./loading";
import { CarDetails } from "../CarDetails";
import { SectionTitle } from "../SectionTitle";


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
        <SectionTitle>Detalhes Tecnicos</SectionTitle>
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

      <CarDetails {...car} />

    </div>
  );
};