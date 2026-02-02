import { useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";
import type { PageCount, PageNumber, Pagination } from "@shared/search/types/pagination";
import type { FilterOperator, Filters } from "@shared/search/types/filter";
import { usePagination, type PaginationConfiguration } from "@shared/search/hooks/pagination";
import { useFilter, type FilterConfiguration } from "@shared/search/hooks/filter";

export interface SearchConfiguration<Entity extends Object = any, Filter extends Object = any> {
    pagination?: PaginationConfiguration;
    filter?: FilterConfiguration<Filter>;

    fetchData: (pagination: Pagination, filter: Filters<Filter>) => Promise<Entity[]>;
    fetchCount: () => Promise<PageCount>;
}

export interface SearchController<Entity extends Object = any, Filter extends Object = any> {
    data: Entity[];
    pagination: Pagination;
    filters: Filters<Filter>;

    changePage: (page: PageNumber) => void;
    changeFilter: <Key extends keyof Filter>(path: Key, operator: FilterOperator, value: Nullable<Filter[Key]>) => void;
    resetFilters: () => void;
    refresh: () => void;
}

export function useSearch<Entity extends Object = any, Filter extends Object = any>(
    configuration: SearchConfiguration<Entity, Filter>
): SearchController<Entity, Filter> {
    const [data, setData] = useState<Entity[]>([]);

    const { pagination, updatePagination } = usePagination({
        initialPage: configuration?.pagination?.initialPage,
        initialLimit: configuration?.pagination?.initialLimit,
        initialCount: configuration?.pagination?.initialCount
    });

    const { filters, updateFilter, resetFilters } = useFilter<Filter>({
        initialFilters: configuration?.filter?.initialFilters
    });

    const loadCount = async (): Promise<void> => {
        return configuration.fetchCount()
            .then((count: PageCount) => {
                updatePagination(pagination.page, pagination.limit, count);
            });
    };

    const loadData = async (pagination: Pagination, filters: Filters<Filter>): Promise<void> => {
        return configuration.fetchData(pagination, filters)
            .then((response: Entity[]) => {
                setData(response);
            });
    };

    useEffect(() => {
        loadData(pagination, filters);
    }, [filters, pagination.page, pagination.limit]);

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
        changeFilter: <Key extends keyof Filter>(path: Key, operator: FilterOperator, value: Nullable<Filter[Key]>): void => {
            updateFilter(path, operator, value);
        },
        refresh: (): void => {
            loadData(pagination, filters);
        },
        resetFilters: (): void => {
            resetFilters();
        }
    };
}
