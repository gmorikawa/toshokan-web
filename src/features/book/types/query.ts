import type { QueryOptions } from "@shared/search/types/query";

export interface BookQueryOptions extends QueryOptions {
    title?: string;
}