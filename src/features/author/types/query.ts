import type { QueryOptions } from "@/types/query";

export interface AuthorQueryOptions extends QueryOptions {
    fullname?: string;
};