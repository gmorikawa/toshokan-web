import type { ID } from "@shared/entity/types/id";

export type OrganizationType = "UNIVERSITY" | "COMPANY";

export interface Organization {
    id: ID;
    name: string;
    description: string;
    type: OrganizationType;
}

export interface NewOrganization {
    name: string;
    description: string;
    type: OrganizationType;
}