export type Page = number;
export type Size = number;
export type Count = number;

export interface Pagination {
    page: Page;
    size: Size;
    count: Count;

    update(page: Page, size?: Size, count?: Count): void;
}
