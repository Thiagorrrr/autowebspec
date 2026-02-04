"use client";

import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";

export function useCarsById(id: string) {
    const { getCarById } = useApi();

    return useQuery({
        queryKey: ["carsbyid", id],
        queryFn: () => getCarById(id),
        enabled: !!id,
    });
}