import { Environment } from "@/config/environment";

import type { QueryOptions } from "@/types/query";

import type { Session } from "@features/auth/types/session";
import type { Bundle } from "@features/bundle/types/bundle";

export async function getAllBundles(session: Session, query?: QueryOptions): Promise<Bundle[]> {
    const url = new URL(`${Environment.API_URL}/bundles`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());

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
