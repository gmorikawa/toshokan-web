import { Environment } from "@/config/environment";

import type { QueryOptions } from "@/types/query";

import type { Session } from "@features/auth/types/session";
import type { Category } from "@features/category/types/category";

export async function getAllCategories(session: Session, query?: QueryOptions): Promise<Category[]> {
    const url = new URL(`${Environment.API_URL}/categories`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());

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
