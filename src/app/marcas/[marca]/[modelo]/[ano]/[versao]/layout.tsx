import { dataCars } from "@/components/Main/data";
import { ReactNode } from "react";

export function generateStaticParams() {
    const cars = dataCars();

    return cars.map(car => ({
        marca: car.make.toLowerCase().replace(/\s+/g, "-"),
        modelo: car.model.toLowerCase().replace(/\s+/g, "-"),
        ano: String(car.year),
        versao: car.version.toLowerCase().replace(/\s+/g, "-")
    }));
}

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
