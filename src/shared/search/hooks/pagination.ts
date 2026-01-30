import { useState } from "react";

import type {
    PageCount,
    PageNumber,
    Pagination,
    PageSize
} from "@shared/search/types/pagination";

export interface PaginationConfiguration {
    initialPage?: PageNumber;
    initialSize?: PageSize;
    initialCount?: PageCount;
}

export interface PaginationController {
    pagination: Pagination;

    updatePagination(page: PageNumber, size?: PageSize, count?: PageCount): void;
}

export function usePagination(
    config?: PaginationConfiguration
): PaginationController {
    const [pagination, setPagination] = useState<Pagination>({
        page: config?.initialPage ?? 1,
        size: config?.initialSize ?? 10,
        count: config?.initialCount ?? 0
    });

    const updatePagination = (newPage: PageNumber, newSize?: PageSize, newCount?: PageCount): void => {
        setPagination({
            page: newPage,
            size: newSize !== undefined ? newSize : pagination.size,
            count: newCount !== undefined ? newCount : pagination.count
        })
    };

    return {
        pagination,
        updatePagination,
    };
}
