"use client";

import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";

export function useCars() {
    const { getCars } = useApi();

    return useQuery({
        queryKey: ["cars"],
        queryFn: getCars,
    });
}
