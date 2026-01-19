import type { ID } from "@shared/entity/types/id";

export interface Category {
    id: ID;
    name: string;
}

export interface NewCategory {
    name: string;
}