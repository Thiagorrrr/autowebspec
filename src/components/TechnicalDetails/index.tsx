"use client"
import { useMemo } from "react";
import { BackButton } from "../BackButton";
import { SectionTitle } from "../SectionTitle";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "../BreadCrumb";
import { useCars } from "@/hooks/queries/useCars";
import { Car } from "@/types/types";
import { CarDetails } from "../CarDetails";

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
      <SectionTitle>
        Ficha Completa: {car?.version}
      </SectionTitle>
      <CarDetails {...car} />
    </div>
  )
}

export default TechnicalDetails