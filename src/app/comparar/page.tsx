import { DragRace } from "@/components/DragRace"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Comparar Carros",
    description: "Selecione dois ou ate quatro veículos e compare fichas técnicas, motorização, consumo e desempenho lado a lado.",
    keywords: ["comparar carros", "comparativo de carros", "comparar fichas técnicas", "qual carro comprar", "teste de desempenho"],
    alternates: {
        canonical: 'https://autowebspec.com.br/comparar',
    },
};


const comparar = () => {

    return (
        <DragRace />
    )
}

export default comparar