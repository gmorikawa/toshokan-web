import type { ID } from "@shared/entity/types/id";

export interface Publisher {
    id: ID;
    name: string;
    description: string;
}

export interface NewPublisher {
    name: string;
    description: string;
}