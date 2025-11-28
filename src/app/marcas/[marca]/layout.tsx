import { dataCars } from "@/components/Main/data";
import { ReactNode } from "react";

export function generateStaticParams() {
    const cars = dataCars();

    // pega apenas as marcas únicas
    const uniqueBrands = [...new Set(cars.map(c => c.make))];

    return uniqueBrands.map(make => ({
        marca: make.toLowerCase().replace(/\s+/g, "-")
    }));
}

export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
