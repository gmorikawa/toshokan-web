import { useEffect, useState } from "react";

import type { PageCount, PageNumber, Pagination } from "@shared/search/types/pagination";
import type { Filters } from "@shared/search/types/filter";
import { usePagination, type PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useFilter } from "@shared/search/hooks/filter";

export interface SearchConfiguration<Entity extends Object> extends PaginationConfiguration {
    fetchData: (pagination: Pagination, filter: Filters<Entity>,) => Promise<Entity[]>;
    fetchCount: () => Promise<PageCount>;
}

export interface SearchController<Entity extends Object> {
    data: Entity[];
    pagination: Pagination;
    filters: Filters<Entity>;

    changePage: (page: PageNumber) => void;
    changeFilter: <Value>(path: string, value: Value) => void;
    resetFilters: () => void;
    refresh: () => void;
}

export function useSearch<Entity extends Object>(
    configuration: SearchConfiguration<Entity>
): SearchController<Entity> {
    const [data, setData] = useState<Entity[]>([]);

    const { pagination, updatePagination } = usePagination({
        initialPage: configuration?.initialPage,
        initialSize: configuration?.initialSize,
        initialCount: configuration?.initialCount
    });

    const {
        filters,
        updateFilter,
        resetFilters
    } = useFilter<Entity>();

    const loadCount = async (): Promise<void> => {
        return configuration.fetchCount()
            .then((count: PageCount) => {
                updatePagination(pagination.page, pagination.size, count);
            });
    };

    const loadData = async (pagination: Pagination): Promise<void> => {
        return configuration.fetchData(pagination, filters)
            .then((response: Entity[]) => {
                setData(response);
            });
    };

    useEffect(() => {
        loadData(pagination);
    }, [filters, pagination.page, pagination.size]);

    useEffect(() => {
        loadCount();
    }, [filters]);
    return {
        data,
        pagination,
        filters,
        changePage: (page: PageNumber): void => {
            updatePagination(page);
        },
        changeFilter: <Value>(path: string, value: Value): void => {
            updateFilter<Value>(path, value);
        },
        refresh: (): void => {
            loadData(pagination);
        },
        resetFilters: (): void => {
            resetFilters();
        }
    };
}
