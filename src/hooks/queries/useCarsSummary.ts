"use client";

import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";

export function useCarsSummary() {
    const { getCarsSummary } = useApi();

    return useQuery({
        queryKey: ["cars", "summary"],
        queryFn: getCarsSummary,
    });
}