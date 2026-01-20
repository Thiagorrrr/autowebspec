import { BrandsList } from "@/components/BrandList"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Marcas e Fabricantes",
    description: "Explore os principais fabricantes de veículos e marcas de acessórios. Encontre produtos compatíveis e parcerias de confiança para seu carro."
};
const marcas = () => {
    return (
        <BrandsList />
    )
}

export default marcas