import type { QueryOptions } from "@shared/search/types/query";

export interface TopicQueryOptions extends QueryOptions {
    name?: string;
}