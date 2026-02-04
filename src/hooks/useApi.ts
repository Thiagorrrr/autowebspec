import { fetchCars, fetchNews, fetchCarById, fetchAllCarsSummary } from "@/lib/api";

export const useApi = () => {
    return {
        getCars: fetchCars,
        getNews: fetchNews,
        getCarById: fetchCarById,
        getCarsSummary: fetchAllCarsSummary
    };
};
