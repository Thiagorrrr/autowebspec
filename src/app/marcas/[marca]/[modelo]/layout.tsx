import { fetchCarsForBuild } from "@/lib/apis";
import { ReactNode } from "react";

export async function generateStaticParams() {
    const cars = await fetchCarsForBuild()

    const uniquePairs = new Map();

    for (const car of cars) {
        const key = `${car.make}-${car.model}`;
        if (!uniquePairs.has(key)) {
            uniquePairs.set(key, {
                marca: car.make.toLowerCase().replace(/\s+/g, "-"),
                modelo: car.model.toLowerCase().replace(/\s+/g, "-")
            });
        }
    }

    return Array.from(uniquePairs.values());
}


export default function Layout({ children }: {
    children: ReactNode;
}) {
    return children;
}
