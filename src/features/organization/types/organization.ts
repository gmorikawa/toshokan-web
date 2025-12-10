export type OrganizationType = "UNIVERSITY" | "COMPANY";

export interface Organization {
    id: string;
    name: string;
    description: string;
    type: OrganizationType;
}

export interface NewOrganization {
    name: string;
    description: string;
    type: OrganizationType;
}