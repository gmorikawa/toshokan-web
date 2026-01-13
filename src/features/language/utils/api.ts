import { Environment } from "@/config/environment";

import type { QueryOptions } from "@/types/query";

import type { Session } from "@features/auth/types/session";
import type { Language } from "@features/language/types/language";

export async function getAllLanguages(session: Session, query?: QueryOptions): Promise<Language[]> {
    const url = new URL(`${Environment.API_URL}/languages`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllLanguages(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/languages/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getLanguageById(session: Session, id: string): Promise<Language> {
    const url = new URL(`${Environment.API_URL}/languages/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createLanguage(session: Session, language: Partial<Language>): Promise<Language> {
    const url = new URL(`${Environment.API_URL}/languages`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(language)
    });

    return response.json();
}

export async function updateLanguage(session: Session, id: string, language: Language): Promise<Language> {
    const url = new URL(`${Environment.API_URL}/languages/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(language)
    });

    return response.json();
}

export async function deleteLanguage(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/languages/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
