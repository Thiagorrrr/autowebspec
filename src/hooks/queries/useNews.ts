"use client";

import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";

export function useNews() {
    const { getNews } = useApi();

    return useQuery({
        queryKey: ["news"],
        queryFn: getNews,
    });
}
