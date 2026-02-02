import { Environment } from "@/config/environment";

import type { QueryOptions } from "@shared/search/types/query";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { Category } from "@features/category/types/category";

export async function getAllCategories(session: Session, query?: QueryOptions): Promise<Category[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("categories");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL(url, query?.filters);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllCategories(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/categories/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getCategoryById(session: Session, id: string): Promise<Category> {
    const url = new URL(`${Environment.API_URL}/categories/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createCategory(session: Session, category: Partial<Category>): Promise<Category> {
    const url = new URL(`${Environment.API_URL}/categories`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(category)
    });

    return response.json();
}

export async function updateCategory(session: Session, id: string, category: Category): Promise<Category> {
    const url = new URL(`${Environment.API_URL}/categories/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(category)
    });

    return response.json();
}

export async function deleteCategory(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/categories/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
