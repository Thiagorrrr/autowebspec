"use client"
import { ChevronRight, Factory } from "lucide-react";
import { Car } from "../Main/data";
import { SectionTitle } from "../SectionTitle";
import { Card } from "../Card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface CarModel {
    model: string;
    years: { year: number; versions: Car[] }[];
}

export interface CarBrand {
    make: string;
    description: string;
    logoColor: string;
    models: CarModel[];
}

export type ViewType = 'versus' | 'ranking' | 'calculator' | 'events' | 'brands' | 'brandDetail' | 'modelDetail' | 'yearDetail' | 'versionDetail' | 'details';


export const BRAND_INFO: Record<string, { description: string; logoColor: string }> = {
    chevrolet: {
        description:
            "Fundada em 1911 nos EUA, a Chevrolet é conhecida por veículos acessíveis, robustos e populares, combinando desempenho e excelente custo-benefício em modelos como Onix e S10.",
        logoColor: "#C99D00"
    },
    hyundai: {
        description:
            "Montadora sul-coreana que se destaca por design moderno, ótimo acabamento e garantia estendida. Modelos como HB20 e Creta impulsionaram sua forte presença no Brasil.",
        logoColor: "#002C5F"
    },
    peugeot: {
        description:
            "Marca francesa reconhecida pelo design arrojado e conforto. O Peugeot 208 é um dos compactos mais tecnológicos do segmento, reforçando sua identidade inovadora.",
        logoColor: "#003A70"
    },
    volkswagen: {
        description:
            "Fundada em 1937, a Volkswagen é uma das maiores fabricantes do mundo, famosa por engenharia sólida e modelos icônicos como Fusca, Golf e T-Cross.",
        logoColor: "#002D52"
    },
    fiat: {
        description:
            "Marca italiana focada em carros urbanos, econômicos e versáteis. Líder no Brasil com modelos como Argo, Mobi e Toro, oferece ótimo custo-benefício.",
        logoColor: "#B20D30"
    },
    citroen: {
        description:
            "Montadora francesa conhecida pelo conforto, suspensão macia e soluções inovadoras. Modelos como C4 Cactus destacam sua proposta de design diferenciado.",
        logoColor: "#C3002F"
    },
    renault: {
        description:
            "Fabricante francesa popular no Brasil, reconhecida por praticidade, economia e ótimo custo-benefício em modelos como Kwid, Duster e Kardian.",
        logoColor: "#FFCC00"
    },
    byd: {
        description:
            "Maior fabricante global de veículos elétricos, a BYD combina tecnologia avançada, autonomia elevada e construção moderna. Destaque para Dolphin e Seal.",
        logoColor: "#D7000F"
    },
    honda: {
        description:
            "Marca japonesa sinônimo de confiabilidade, eficiência e durabilidade. Civic, HR-V e Fit são referências em qualidade e suavidade ao dirigir.",
        logoColor: "#E4002B"
    },
    toyota: {
        description:
            "Montadora japonesa famosa por confiabilidade extrema, baixa manutenção e alta durabilidade. Corolla e Hilux são líderes absolutos em seus segmentos.",
        logoColor: "#EB0A1E"
    },
    nissan: {
        description:
            "Marca japonesa que combina tecnologia, conforto e consumo eficiente. Destaque para Kicks e Sentra, com forte presença global em SUVs compactos.",
        logoColor: "#C3002F"
    },
    jeep: {
        description:
            "Ícone americano especializado em SUVs e veículos off-road. Renegade e Compass mantêm a tradição da marca em robustez e versatilidade.",
        logoColor: "#1A1A1A"
    },
    "caoa-chery": {
        description:
            "Parceria entre CAOA e Chery, oferecendo veículos modernos, bem equipados e competitivos no mercado brasileiro, como Tiggo 5X e Arrizo 6.",
        logoColor: "#D0021B"
    },
    gwm: {
        description:
            "Great Wall Motors, marca chinesa focada em SUVs e picapes com alta tecnologia e eletrificação. Modelos híbridos como o Haval H6 se destacam pelo desempenho.",
        logoColor: "#990000"
    }
};

export const COLORS = {
    primary: '#6319F7',
    primaryDark: '#5014c9',
    primaryLight: 'rgba(99, 25, 247, 0.1)',
    yellow: '#FACC15',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray800: '#1F2937',
    gray900: '#111827',
    white: '#FFFFFF'
};

export const BrandsList: React.FC<{ carCatalog: CarBrand[] }> = ({ carCatalog }) => {
    const uniqueMakes = carCatalog.map(b => b.make);
    const pathname = usePathname();
    return (
        <div className="space-y-6">
            <SectionTitle>
                <Factory size={20} className="text-[#6319F7]" /> Marcas Disponíveis
            </SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uniqueMakes.map(make => {
                    return (
                        <Link href={`${pathname}${make.toLowerCase().replace(/\s+/g, "-")}`} key={make}>
                            <Card
                                key={make}
                                className="text-center p-6 border-2 hover:border-[#6319F7]"
                            >
                                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-3">
                                    <Image src={`/${make.toLowerCase()}-logo.png`} alt="image" width={50} height={50} />
                                </div>
                                <h3 className="font-black text-lg text-gray-800"  >{make}</h3>

                                <span className="text-xs text-[#6319F7] font-bold flex items-center justify-center mt-1">

                                    Ver Modelos <ChevronRight size={14} />
                                </span>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};