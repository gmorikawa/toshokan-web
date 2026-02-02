import { Environment } from "@/config/environment";

import type { QueryOptions } from "@shared/search/types/query";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { Language } from "@features/language/types/language";

export async function getAllLanguages(session: Session, query?: QueryOptions): Promise<Language[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("languages");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL(url, query?.filters);

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
