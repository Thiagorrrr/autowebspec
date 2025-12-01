"use client"
import { BackButton } from "@/components/BackButton";
import { BRAND_INFO, CarBrand } from "@/components/BrandList";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { ChevronRight, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';

const BrandDetail: React.FC<{ carCatalog: CarBrand[], make: string }> = ({ carCatalog, make }) => {
    const brandData = carCatalog.find(b => b.make.toLowerCase().replace(/\s+/g, "-") === make);
    const info = BRAND_INFO[make] || {};
    const router = useRouter()
    const pathname = usePathname();

    if (!brandData) return <div className="text-red-500">Marca não encontrada.</div>;

    return (
        <div className="space-y-6">
            <BackButton onClick={() => router.back()} label={`Voltar para marcas`} />

            {/* HEADER DA MARCA (Responsivo) */}
            <Card className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 bg-gray-100 border-l-4 border-[#6319F7]">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full shrink-0">
                    <Image src={`/${make.toLocaleLowerCase()}-logo.png`} alt="image" width={50} height={50} />
                </div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2 capitalize">{make.replaceAll("-", " ")}</h1>
                    <p className="text-lg text-gray-600">{info.description || 'Descrição da marca não disponível.'}</p>
                </div>
            </Card>

            <SectionTitle><List size={20} className="text-[#6319F7]" /> Modelos de {make}</SectionTitle>

            {/* GRID DE MODELOS (Responsivo) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {brandData.models.map(model => {
                    return (
                        <Link href={`${pathname}/${model.model.toLowerCase().replace(/\s+/g, "-")}`} key={model.model}>
                            <Card key={model.model} className="overflow-hidden p-0">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-800">{model.model}</h3>
                                    <p className="text-sm text-gray-500">{model.years.length} Anos disponíveis</p>
                                    <span className="text-xs text-[#6319F7] font-bold flex items-center mt-2">
                                        Ver Anos <ChevronRight size={14} />
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BrandDetail