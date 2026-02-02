import { Environment } from "@/config/environment";

import type { QueryOptions } from "@shared/search/types/query";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { Organization } from "@features/organization/types/organization";

export async function getAllOrganizations(session: Session, query?: QueryOptions): Promise<Organization[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("organizations");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL(url, query?.filters);

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
