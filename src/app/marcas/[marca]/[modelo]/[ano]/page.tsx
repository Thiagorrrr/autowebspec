import YearDetail from "@/components/YearDetail";

const ano = ({ params }: { params: { marca: string, modelo: string, ano: number } }) => {
    const { marca, modelo, ano } = params

    return (
        <YearDetail make={marca} model={modelo} year={ano} />
    );
};

export default ano