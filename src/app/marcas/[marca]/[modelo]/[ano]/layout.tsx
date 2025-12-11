import { fetchCarsForBuild } from "@/lib/apis";
import { ReactNode } from "react";

export async function generateStaticParams() {
    const cars = await fetchCarsForBuild();

    // Evita duplicados: marca + modelo + ano
    const unique = new Map();

    for (const car of cars) {
        if (!car.make || !car.model || !car.year) continue;

        const make = String(car.make);
        const model = String(car.model);
        const year = String(car.year);

        const key = `${make}-${model}-${year}`;

        if (!unique.has(key)) {
            unique.set(key, {
                marca: make.toLowerCase().replace(/\s+/g, "-"),
                modelo: model.toLowerCase().replace(/\s+/g, "-"),
                ano: year
            });
        }
    }

    return Array.from(unique.values());
}

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
