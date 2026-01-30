export type PageNumber = number;
export type PageSize = number;
export type PageCount = number;

export interface Pagination {
    page: PageNumber;
    size: PageSize;
    count: PageCount;
}
