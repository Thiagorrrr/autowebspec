"use client"
import { Car, dataCars } from "@/components/Main/data";
import { Ranking } from "@/components/Ranking"

const RAW_CARS = dataCars()

const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));

const ranking = () => {
    return (
        <Ranking data={CARS} />
    )
}

export default ranking