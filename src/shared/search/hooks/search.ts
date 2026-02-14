import { useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";
import type { PageCount, PageNumber, Pagination } from "@shared/search/types/pagination";
import type { Filters } from "@shared/search/types/filter";
import { usePagination, type PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useFilter, type FilterConfiguration } from "@shared/search/hooks/filter";

export interface SearchConfiguration<Entity extends Object = any> {
    deboundTime?: number;
    pagination?: PaginationConfiguration;
    filter?: FilterConfiguration;

    fetchData: (pagination: Pagination, filter: Filters) => Promise<Entity[]>;
    fetchCount: () => Promise<PageCount>;
}

export interface SearchController<Entity extends Object = any> {
    data: Entity[];
    pagination: Pagination;
    filters: Filters;

    changePage: (page: PageNumber) => void;
    getFilterValue<Value>(path: string): Nullable<Value>;
    changeFilter: <Value>(path: string, value: Nullable<Value>) => void;
    resetFilters: () => void;
    refresh: () => void;
}

export function useSearch<Entity extends Object = any>(
    configuration: SearchConfiguration<Entity>
): SearchController<Entity> {
    const [data, setData] = useState<Entity[]>([]);

    const { pagination, updatePagination } = usePagination({
        initialPage: configuration?.pagination?.initialPage,
        initialLimit: configuration?.pagination?.initialLimit,
        initialCount: configuration?.pagination?.initialCount
    });

    const { filters, updateFilter, resetFilters } = useFilter({
        initialFilters: configuration?.filter?.initialFilters
    });

    const fetchCount = () =>
        configuration
            .fetchCount()
            .then((count: PageCount) => {
                updatePagination(pagination.page, pagination.limit, count);
            });

    const fetchData = (pagination: Pagination, filters: Filters) =>
        configuration
            .fetchData(pagination, filters)
            .then((response: Entity[]) => {
                setData(response);
            });

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        if (configuration?.deboundTime) {
            timeout = setTimeout(() => {
                fetchData(pagination, filters);
            }, configuration.deboundTime);
        } else {
            fetchData(pagination, filters);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [filters, pagination.page, pagination.limit]);

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;
        if (configuration?.deboundTime) {
            timeout = setTimeout(() => {
                fetchCount();
            }, configuration.deboundTime);
        } else {
            fetchCount();
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [filters]);
    return {
        data,
        pagination,
        filters,
        changePage: (page: PageNumber): void => {
            updatePagination(page);
        },
        getFilterValue: <Value>(path: string): Nullable<Value> => {
            const filter = filters.find(f => f.name === path);
            return filter ? (filter.value as Nullable<Value>) : null;
        },
        changeFilter: <Value>(path: string, value: Nullable<Value>): void => {
            updateFilter(path, value);
        },
        refresh: (): void => {
            fetchData(pagination, filters);
        },
        resetFilters: (): void => {
            resetFilters();
        }
    };
}
