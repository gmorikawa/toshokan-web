export interface Pagination {
    page: number;
    size: number;
}

export interface QueryOptions {
    pagination?: Pagination;
}