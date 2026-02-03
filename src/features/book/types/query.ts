import type { QueryOptions } from "@shared/search/types/query";

export interface BookFilter{
    title: string;
}

export interface BookQueryOptions extends QueryOptions<BookFilter> { }
