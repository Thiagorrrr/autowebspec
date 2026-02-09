import { ProductList } from "@/components/ProductList"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Produtos, Acessórios Automotivos e Upgrades",
    description: "Equipe seu veículo com os melhores acessórios: som automotivo, iluminação LED, segurança, estética e muito mais para personalizar seu carro.",
    alternates: {
        canonical: 'https://autowebspec.com.br/produtos',
    },
};

const loja = () => {
    return (
        <ProductList />
    )
}

export default loja