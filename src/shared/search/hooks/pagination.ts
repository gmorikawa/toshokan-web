import { useState } from "react";

import type {
    PageCount,
    PageNumber,
    Pagination,
    PageLimit
} from "@shared/search/types/pagination";

export interface PaginationConfiguration {
    initialPage?: PageNumber;
    initialLimit?: PageLimit;
    initialCount?: PageCount;
}

export interface PaginationController {
    pagination: Pagination;

    updatePagination(page: PageNumber, limit?: PageLimit, count?: PageCount): void;
}

export function usePagination(
    config?: PaginationConfiguration
): PaginationController {
    const [pagination, setPagination] = useState<Pagination>({
        page: config?.initialPage ?? 1,
        limit: config?.initialLimit ?? 10,
        count: config?.initialCount ?? 0
    });

    const updatePagination = (newPage: PageNumber, newLimit?: PageLimit, newCount?: PageCount): void => {
        setPagination({
            page: newPage,
            limit: newLimit !== undefined ? newLimit : pagination.limit,
            count: newCount !== undefined ? newCount : pagination.count
        })
    };

    return {
        pagination,
        updatePagination,
    };
}
