"use client"
import { BackButton } from "@/components/BackButton";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { ChevronRight, ListOrdered } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumbs } from "../BreadCrumb";
import { useCars } from "@/hooks/queries/useCars";
import { useCatalog } from "@/hooks/converter/useCatalog";

const YearDetail: React.FC<{ make: string, model: string, year: number }> = ({ make, model, year }) => {
    const { data, isLoading, error } = useCars();
    const { carCatalog } = useCatalog(data || [])

    const yearNum = Number(year);
    const brandData = carCatalog.find(b => b.make.toLocaleLowerCase() === make.toLocaleLowerCase().replace("-", " "));
    const modelData = brandData?.models.find(m => m.model.toLowerCase().replace(/\s+/g, "-") === model.toLocaleLowerCase());
    const yearData = modelData?.years.find(y => y.year === yearNum);

    const router = useRouter()
    const pathname = usePathname();

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar</p>;
    if (!yearData) return <div className="text-red-500">Dados não encontrados para este ano.</div>;

    return (
        <div className="space-y-6 mt-8">
            <Breadcrumbs make={make} model={model} year={String(year)} />
            <BackButton onClick={() => router.back()} label={`Voltar para ${modelData?.model}`} />
            <SectionTitle className="text-xl">
                <ListOrdered size={20} className="text-[#6319F7] capitalize" /> Versões do {model.replaceAll("-", " ")} <span className="text-[#6319F7]">({year})</span>
            </SectionTitle>

            {/* LISTA DE VERSÕES (Responsivo) */}
            <div className="grid gap-4">
                {yearData.versions.map(car => (
                    <Link href={`${pathname}${car.version.toLowerCase().replace(/\s+/g, "-")}`} key={car.id}>
                        <Card
                            className="flex flex-col sm:flex-row items-center gap-4 hover:shadow-lg"
                        >
                            <div className="flex-1 w-full">
                                <h3 className="font-bold text-gray-900 text-lg">{car.version}</h3>
                                <p className="text-sm text-gray-500">{car.specs.stock.hp}cv / {car.specs.stock.torque} kgfm</p>
                            </div>
                            <div className="text-right flex items-center gap-2 text-[#6319F7] font-bold text-sm w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                                <span className="sm:hidden text-gray-500 font-normal">Ver Detalhes</span>
                                <ChevronRight size={20} />
                            </div>

                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default YearDetail