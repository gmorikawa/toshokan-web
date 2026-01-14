import type { QueryOptions } from "@shared/search/types/query";

export interface ResearchPaperQueryOptions extends QueryOptions {
    title?: string;
}