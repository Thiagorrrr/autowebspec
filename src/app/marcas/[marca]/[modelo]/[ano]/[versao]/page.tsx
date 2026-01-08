import TechnicalDetails from "@/components/TechnicalDetails";

const versao = ({ params }: { params: { marca: string, modelo: string, ano: number, versao: string } }) => {
    const { marca, modelo, ano, versao } = params

    return (
        <TechnicalDetails carId={`${marca}-${modelo}-${ano}-${versao}`} />
    );
};

export default versao