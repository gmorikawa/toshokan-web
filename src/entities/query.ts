export interface Pagination {
    page: number;
    size: number;
    count: number;
}

export interface QueryOptions {
    pagination?: Pagination;
}