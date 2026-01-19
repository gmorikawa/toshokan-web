import type { ID } from "@shared/entity/types/id";

export interface Bundle {
    id: ID;
    title: string;
    description: string;
}

export interface NewBundle {
    title: string;
    description: string;
}