import type { QueryOptions } from "@shared/search/types/query";

export interface WhitepaperQueryOptions extends QueryOptions {
    title?: string;
}