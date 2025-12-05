import { fetchCars, fetchNews, fetchCarById } from "@/lib/api";

export const useApi = () => {
    return {
        getCars: fetchCars,
        getNews: fetchNews,
        getCarById: fetchCarById,
    };
};
