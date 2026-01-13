import { Environment } from "@/config/environment";

import type { QueryOptions } from "@/types/query";

import type { Session } from "@features/auth/types/session";
import type { Organization } from "@features/organization/types/organization";

export async function getAllOrganizations(session: Session, query?: QueryOptions): Promise<Organization[]> {
    const url = new URL(`${Environment.API_URL}/organizations`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllOrganizations(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/organizations/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getOrganizationById(session: Session, id: string): Promise<Organization> {
    const url = new URL(`${Environment.API_URL}/organizations/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createOrganization(session: Session, organization: Partial<Organization>): Promise<Organization> {
    const url = new URL(`${Environment.API_URL}/organizations`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(organization)
    });

    return response.json();
}

export async function updateOrganization(session: Session, id: string, organization: Organization): Promise<Organization> {
    const url = new URL(`${Environment.API_URL}/organizations/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(organization)
    });

    return response.json();
}

export async function deleteOrganization(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/organizations/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
