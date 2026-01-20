import { fetchCarsForBuild } from "@/lib/apis";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateStaticParams() {
    const cars = await fetchCarsForBuild();
    const unique = new Map();

    for (const car of cars) {
        if (!car.make || !car.model || !car.year || !car.version) continue;

        const make = String(car.make);
        const model = String(car.model);
        const year = String(car.year);
        const version = String(car.version);

        const key = `${make}-${model}-${year}-${version}`;

        if (!unique.has(key)) {
            unique.set(key, {
                marca: make.toLowerCase().replace(/\s+/g, "-"),
                modelo: model.toLowerCase().replace(/\s+/g, "-"),
                ano: year,
                versao: version.toLowerCase().replace(/\s+/g, "-")
            });
        }

    }

    const result = Array.from(unique.values());
    return result;
}

type Props = {
    params: {
        marca: string;
        modelo: string;
        ano: string;
        versao: string
    };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Formatação para exibição: remove hífens e capitaliza cada palavra
    const format = (text: string) => text.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    const marca = format(params.marca);
    const modelo = format(params.modelo);
    const versao = format(params.versao);
    const ano = params.ano;

    const nomeCompleto = `${marca} ${modelo} ${versao} ${ano}`;

    return {
        title: `Mais detalhes de ${nomeCompleto} - Ficha Técnica e Equipamentos`,
        description: `Ficha técnica detalhada, motorização, consumo e todos os itens de série do ${nomeCompleto}. Veja os dados técnicos completos deste veículo.`
    };
}
export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
