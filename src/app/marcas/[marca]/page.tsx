import BrandDetail from "@/components/BrandDetail";

const marca = ({ params }: { params: { marca: string } }) => {

    const { marca } = params;
    return (
        <BrandDetail make={marca} />
    )
}

export default marca