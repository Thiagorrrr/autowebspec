"use client"


import { Car, dataCars } from "@/components/Main/data";
import TechnicalDetails from "@/components/TechnicalDetails";

const versao = ({ params }: { params: { marca: string, modelo: string, ano: number, versao: string } }) => {


    const { marca, modelo, ano } = params

    const RAW_CARS = dataCars()

    const CARS: Car[] = RAW_CARS.map(c => ({ ...c, name: `${c.make} ${c.model} ${c.version}` }));


    return (
        <TechnicalDetails cars={CARS} carId={`${marca}-${modelo}-${ano}`} />
    );
};

export default versao