
import { Car, dataCars } from "@/components/Main/data";
import { TechnicalDetailsSelected } from "@/components/TechnicalDetailsSelected";


const detalhes = () => {

    const RAW_CARS = dataCars()

    const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));
    return (
        <TechnicalDetailsSelected data={CARS} />
    )
}


export default detalhes