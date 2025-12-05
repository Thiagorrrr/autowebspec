import TechnicalDetails from "@/components/TechnicalDetails";

const versao = ({ params }: { params: { marca: string, modelo: string, ano: number, versao: string } }) => {
    const { marca, modelo, ano } = params

    return (
        <TechnicalDetails carId={`${marca}-${modelo}-${ano}`} />
    );
};

export default versao