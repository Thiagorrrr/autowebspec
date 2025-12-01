import { CostCalculator } from "@/components/CostCalculator"
import { Car, dataCars } from "@/components/Main/data";

const RAW_CARS = dataCars()

const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));

const calcular = () => {
    return (
        <CostCalculator cars={CARS} rawCars={RAW_CARS} />
    )
}

export default calcular