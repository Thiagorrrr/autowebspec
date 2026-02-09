import { Ranking } from "@/components/Ranking"

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ranking de Preços e Economia",
    description: "Compare os valores de mercado e encontre os melhores preços. Rankings atualizados dos itens mais baratos, melhores ofertas e custo-benefício automotivo.",
    alternates: {
        canonical: 'https://autowebspec.com.br/ranking',
    },
};
const ranking = () => {
    return (
        <Ranking />
    )
}

export default ranking