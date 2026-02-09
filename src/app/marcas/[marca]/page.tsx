import BrandDetail from "@/components/BrandDetail";
import { Metadata } from "next";

type Props = {
    params: { marca: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // Ajusta o nome para ficar bonito (ex: toyota -> Toyota)
    const nomeMarca = params.marca.charAt(0).toUpperCase() + params.marca.slice(1);

    return {
        title: `Modelos da ${nomeMarca}`,
        description: `Lista completa de todos os modelos de carros da ${nomeMarca}. Veja os veículos disponíveis e explore as opções desta marca.`,
        alternates: {
            canonical: `https://autowebspec.com.br/marcas/${params.marca}`,
        },
    };
}

const marca = ({ params }: { params: { marca: string } }) => {

    const { marca } = params;
    return (
        <BrandDetail make={marca} />
    )
}

export default marca