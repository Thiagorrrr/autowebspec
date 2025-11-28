"use client"
import { BackButton } from "@/components/BackButton";
import { CarBrand } from "@/components/BrandList";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";


const ModelDetail: React.FC<{ carCatalog: CarBrand[], make: string, model: string }> = ({ carCatalog, make, model }) => {
    const brandData = carCatalog.find(b => b.make.toLocaleLowerCase() === make.toLocaleLowerCase());
    const modelData = brandData?.models.find(m => m.model.toLowerCase().replace(/\s+/g, "-") === model);

    const router = useRouter()
    const pathname = usePathname();

    if (!modelData) return <div className="text-red-500">Modelo não encontrado.</div>;

    return (
        <div className="space-y-6">
            <BackButton onClick={() => router.back()} label={`Voltar para ${brandData?.make}`} />

            {/* HEADER DO MODELO (Responsivo) */}
            < Card className="p-0 overflow-hidden shadow-xl">
                <div className="w-full h-60 relative">
                    <Image src={`/${modelData.years[0].versions[0].image}`} alt={`${modelData.years[0].versions[0].version}`} width={300} height={500} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                        <h1 className="text-4xl font-black text-white capitalize">{model.replaceAll("-", " ")}</h1>
                    </div>
                </div>
            </Card>

            <SectionTitle><Calendar size={20} className="text-[#6319F7]" /> Anos Disponíveis</SectionTitle>

            {/* LISTA DE ANOS (Responsivo) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {modelData.years.map(({ year }) => (
                    <Link href={`${pathname}/${year}`} key={year}>
                        <Card
                            className="text-center p-4 border-2 hover:border-[#6319F7] bg-gray-100"
                        >

                            <h3 className="font-black text-2xl text-gray-800">{year}</h3>
                            <span className="text-xs text-[#6319F7] font-bold flex items-center justify-center mt-2">
                                Ver Versões <ChevronRight size={14} />
                            </span>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default ModelDetail