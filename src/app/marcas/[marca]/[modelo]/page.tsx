
import ModelDetail from "@/components/ModelDetail";

const modelo = ({ params }: { params: { marca: string, modelo: string } }) => {

    const { marca, modelo } = params;
    return (
        <ModelDetail make={marca} model={modelo} />
    );
};
export default modelo