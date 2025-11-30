import type { Pagination } from "@/types/query";
import { useState } from "react";

export interface UsePagination extends Pagination {
    count: number;

    setPage: (page: number) => void;
    setSize: (size: number) => void;
    setCount: (count: number) => void;
}

export interface PaginationConfiguration extends Pagination {
    count: number;
}

export function usePagination(configuration?: PaginationConfiguration): UsePagination {
    const [page, setPage] = useState(configuration?.page ?? 1);
    const [count, setCount] = useState(configuration?.count ?? 10);
    const [size, setSize] = useState(configuration?.size ?? 10);

    return {
        page,
        size,
        count,
        setPage,
        setSize,
        setCount
    };
}

export default usePagination;