import type { QueryOptions } from "@shared/search/types/query";
export interface AuthorFilter {
    fullname: string;
}

export interface AuthorQueryOptions extends QueryOptions { }
