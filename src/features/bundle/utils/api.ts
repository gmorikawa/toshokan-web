import { Environment } from "@/config/environment";

import type { QueryOptions } from "@shared/search/types/query";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { Bundle } from "@features/bundle/types/bundle";

export async function getAllBundles(session: Session, query?: QueryOptions): Promise<Bundle[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("bundles");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL(url, query?.filters);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllBundles(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/bundles/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getBundleById(session: Session, id: string): Promise<Bundle> {
    const url = new URL(`${Environment.API_URL}/bundles/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createBundle(session: Session, bundle: Partial<Bundle>): Promise<Bundle> {
    const url = new URL(`${Environment.API_URL}/bundles`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(bundle)
    });

    return response.json();
}

export async function updateBundle(session: Session, id: string, bundle: Bundle): Promise<Bundle> {
    const url = new URL(`${Environment.API_URL}/bundles/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(bundle)
    });

    return response.json();
}

export async function deleteBundle(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/bundles/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
