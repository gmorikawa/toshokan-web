export type PageNumber = number;
export type PageLimit = number;
export type PageCount = number;

export interface Pagination {
    page: PageNumber;
    limit: PageLimit;
    count: PageCount;
}
