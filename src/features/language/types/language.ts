import type { ID } from "@shared/entity/types/id";

export interface Language {
    id: ID;
    name: string;
}

export interface NewLanguage {
    name: string;
}