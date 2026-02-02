import { Environment } from "@/config/environment";

import type { QueryOptions } from "@shared/search/types/query";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { Publisher } from "@features/publisher/types/publisher";

export async function getAllPublishers(session: Session, query?: QueryOptions): Promise<Publisher[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("publishers");
        appendPaginationToURL(url, query?.pagination);
        appendFiltersToURL(url, query?.filters);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllPublishers(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/publishers/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getPublisherById(session: Session, id: string): Promise<Publisher> {
    const url = new URL(`${Environment.API_URL}/publishers/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createPublisher(session: Session, publisher: Partial<Publisher>): Promise<Publisher> {
    const url = new URL(`${Environment.API_URL}/publishers`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(publisher)
    });

    return response.json();
}

export async function updatePublisher(session: Session, id: string, publisher: Publisher): Promise<Publisher> {
    const url = new URL(`${Environment.API_URL}/publishers/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(publisher)
    });

    return response.json();
}

export async function deletePublisher(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/publishers/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
