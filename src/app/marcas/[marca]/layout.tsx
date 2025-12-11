import { fetchCarsForBuild } from "@/lib/apis";
import { ReactNode } from "react";

export async function generateStaticParams() {
    const cars = await fetchCarsForBuild()
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
