import { Car, NewsArticle } from "@/types/types";

const BASE_URL_CARS = process.env.NEXT_PUBLIC_BASE_URL_CARS;
const BASE_URL_CARS_BY_ID = process.env.NEXT_PUBLIC_BASE_URL_CARS_BY_ID;
const BASE_URL_NEWS = process.env.NEXT_PUBLIC_BASE_URL_NEWS;

export async function fetchCars(): Promise<Car[]> {
    const res = await fetch(`${BASE_URL_CARS}/cars`, {
    });
    return res.json();
}

export async function fetchNews(): Promise<NewsArticle[]> {
    const res = await fetch(`${BASE_URL_NEWS}/news`, {
    });
    return res.json();
}

export async function fetchCarById(id: string): Promise<Car> {
    const res = await fetch(`${BASE_URL_CARS_BY_ID}/cars/${id}`, {
    });
    return res.json();
}

export async function fetchAllCarsSummary(): Promise<Car[]> {
    // Note o parâmetro ?summary=true que configuramos na Lambda
    const res = await fetch(`${BASE_URL_CARS_BY_ID}/cars?summary=true`);

    if (!res.ok) throw new Error("Erro ao carregar lista de carros");

    return res.json();
}
