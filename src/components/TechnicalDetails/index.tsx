"use client"
import { useMemo } from "react";
import { BackButton } from "../BackButton";
import { SectionTitle } from "../SectionTitle";
import { Activity, Camera, CarIcon, Check, CheckCircle, Grid, X } from "lucide-react";
import { Label } from "../Label";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "../BreadCrumb";
import { useCars } from "@/hooks/queries/useCars";
import { Car } from "@/types/types";

const TechnicalDetails = ({ carId }: { carId?: string }) => {
  const router = useRouter()
  const { data, isLoading, error } = useCars();
  const car = useMemo(() => {

    if (!data) return undefined;
    if (carId) {
      return data.find((c: Car) => c.id === carId);
    }
    return data[0];
  }, [carId, data]);


  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar</p>;
  if (!car) return <div>Carro não encontrado.</div>;

  return (
    <div className="space-y-6 mt-8">
      <Breadcrumbs />
      {carId && <BackButton onClick={() => router.back()} label={`Voltar para ${car?.year}`} />}
      <SectionTitle className="mb-6!">
        <CarIcon size={24} className="text-[#6319F7]" /> Ficha Completa: {car?.version}
      </SectionTitle>

      <div className="space-y-2">
        <SectionTitle><Camera size={16} className="text-[#6319F7]" /> Galeria de Fotos</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {car?.photos?.map((photo, idx) => (
            <div key={idx} className={`rounded-lg overflow-hidden border border-gray-200 h-24 ${idx === 0 ? 'col-span-2 md:col-span-3 h-fit' : ''}`}>
              <Image src={`/${photo}`} alt={`${car.make} ${car.version} ${idx}`} width={300} height={400} className="w-full h-full object-cover" />
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
  )
}

export default TechnicalDetails