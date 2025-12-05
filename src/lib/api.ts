import { Car, NewsArticle } from "@/types/types";

const BASE_URL_CARS = process.env.BASE_URL_CARS;
const BASE_URL_NEWS = process.env.BASE_URL_NEWS;

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
    const res = await fetch(`${BASE_URL_CARS}/cars/${id}`, {
    });
    return res.json();
}

