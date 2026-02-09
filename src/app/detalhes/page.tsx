
import { TechnicalDetailsSelected } from "@/components/TechnicalDetailsSelected";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detalhes Técnicos e Equipamentos",
    description: "Conheça todos os itens de série, pacotes de tecnologia, segurança e características internas. Saiba exatamente o que cada modelo oferece de fábrica.",
    alternates: {
        canonical: 'https://autowebspec.com.br/detalhes',
    },
};

const detalhes = () => {
    return (
        <TechnicalDetailsSelected />
    )
}


export default detalhes