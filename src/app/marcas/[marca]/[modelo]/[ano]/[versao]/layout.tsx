import { fetchCarsForBuild } from "@/lib/apis";
import { ReactNode } from "react";

export async function generateStaticParams() {
    const cars = await fetchCarsForBuild();
    const unique = new Map();

    for (const car of cars) {
        if (!car.make || !car.model || !car.year || !car.version) continue;

        const make = String(car.make);
        const model = String(car.model);
        const year = String(car.year);
        const version = String(car.version);

        const key = `${make}-${model}-${year}-${version}`;

        if (!unique.has(key)) {
            unique.set(key, {
                marca: make.toLowerCase().replace(/\s+/g, "-"),
                modelo: model.toLowerCase().replace(/\s+/g, "-"),
                ano: year,
                versao: version.toLowerCase().replace(/\s+/g, "-")
            });
        }

    }

    const result = Array.from(unique.values());
    return result;
}

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
