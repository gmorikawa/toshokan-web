import type { QueryOptions } from "@shared/search/types/query";

export interface AuthorQueryOptions extends QueryOptions {
    fullname?: string;
};