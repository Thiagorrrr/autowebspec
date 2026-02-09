import { fetchCarsForBuild } from "@/lib/apis";
import { Metadata } from "next";
import { ReactNode } from "react";

type Props = {
    params: {
        marca: string;
        modelo: string;
        ano: string
    };
};

export async function generateStaticParams() {
    const cars = await fetchCarsForBuild();

    // Evita duplicados: marca + modelo + ano
    const unique = new Map();

    for (const car of cars) {
        if (!car.make || !car.model || !car.year) continue;

        const make = String(car.make);
        const model = String(car.model);
        const year = String(car.year);

        const key = `${make}-${model}-${year}`;

        if (!unique.has(key)) {
            unique.set(key, {
                marca: make.toLowerCase().replace(/\s+/g, "-"),
                modelo: model.toLowerCase().replace(/\s+/g, "-"),
                ano: year
            });
        }
    }

    return Array.from(unique.values());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Transforma "toyota-corolla" em "Toyota Corolla"
    const marca = params.marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const modelo = params.modelo.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const ano = params.ano;

    return {
        title: `Mais detalhes sobre as versões de ${marca} ${modelo} ${ano} - Versões e Ficha Técnica`,
        description: `Todas as versões e especificações técnicas para o ${marca} ${modelo} ${ano}. Compare motorização, equipamentos e detalhes de cada variante.`,
        alternates: {
            canonical: `https://autowebspec.com.br/marcas/${params.marca}/${params.modelo}/${params.ano}`,
        },
    };
}

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
