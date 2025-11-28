"use client"
import { CostCalculator } from "@/components/CostCalculator"
import { Car, dataCars } from "@/components/Main/data";

const RAW_CARS = dataCars()

const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));

const calcular = ()=> {
    return (
        <CostCalculator data={CARS}/>
    )
}

export default calcular