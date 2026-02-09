import { CostCalculator } from "@/components/CostCalculator"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calculadora de Custos e Gastos",
    description: "Calculadora de gastos automotivos: estime custos com IPVA, seguro, manutenção preventiva e consumo de combustível para planejar seu orçamento.",
    alternates: {
        canonical: 'https://autowebspec.com.br/custos/',
    },
};

const calcular = () => {
    return (
        <CostCalculator />
    )
}

export default calcular