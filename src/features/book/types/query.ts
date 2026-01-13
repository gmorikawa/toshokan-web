import type { QueryOptions } from "@/types/query";

export interface BookQueryOptions extends QueryOptions {
    title?: string;
}