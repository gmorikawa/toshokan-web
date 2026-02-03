import type { Pagination } from "@shared/search/types/pagination";
import type { Filters } from "@shared/search/types/filter";

export interface QueryOptions {
    pagination?: Pagination;
    filters?: Filters;
}