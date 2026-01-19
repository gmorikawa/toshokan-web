import type { ID } from "@shared/entity/types/id";

export interface Topic {
    id: ID;
    name: string;
}

export interface NewTopic {
    name: string;
}