import { Car } from "@/types/types";

let cachedCars: Car[] | null = null;

const BASE_URL_CARS = process.env.NEXT_PUBLIC_BASE_URL_CARS;

export async function fetchCarsForBuild(): Promise<Car[]> {
    if (cachedCars) return cachedCars;

    const res = await fetch(`${BASE_URL_CARS}/cars`, {
        cache: "no-store", // força SEM CACHE
    });
    const data = await res.json();

    cachedCars = data;
    return data;
}
