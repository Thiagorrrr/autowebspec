import { fetchCarsForBuild } from "@/lib/apis";
import { Metadata } from "next";
import { ReactNode } from "react";
type Props = {
    params: { marca: string; modelo: string };
};
export async function generateStaticParams() {
    const cars = await fetchCarsForBuild()

    const uniquePairs = new Map();

    for (const car of cars) {
        const key = `${car.make}-${car.model}`;
        if (!uniquePairs.has(key)) {
            uniquePairs.set(key, {
                marca: car.make.toLowerCase().replace(/\s+/g, "-"),
                modelo: car.model.toLowerCase().replace(/\s+/g, "-")
            });
        }
    }

    return Array.from(uniquePairs.values());
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Limpa os hifens e coloca a primeira letra em maiúsculo
    const marca = params.marca.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const modelo = params.modelo.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    return {
        title: `Detalhes sobre ${marca} ${modelo}`,
        description: `Ficha técnica, versões e especificações do ${marca} ${modelo}. Confira todos os detalhes técnicos e equipamentos de série deste veículo.`,
        alternates: {
            canonical: `https://autowebspec.com.br/marcas/${params.marca}/${params.modelo}/`,
        },
    };
}

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
