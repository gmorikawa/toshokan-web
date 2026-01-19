import type { ID } from "@shared/entity/types/id";

export interface Author {
    id: ID;
    fullname: string;
    biography?: string;
}

export interface NewAuthor {
    fullname: string;
    biography?: string;
}