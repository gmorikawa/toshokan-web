import { Environment } from "@/config/environment";

import type { Session } from "@features/auth/types/session";
import type { Author } from "@features/author/types/author";
import type { AuthorQueryOptions } from "@features/author/types/query";

export async function getAllAuthors(session: Session, query?: AuthorQueryOptions): Promise<Author[]> {
    const url = new URL(`${Environment.API_URL}/authors`);

    query?.pagination?.page && url.searchParams.append("page", query.pagination.page.toString());
    query?.pagination?.size && url.searchParams.append("size", query.pagination.size.toString());
    query?.fullname && url.searchParams.append("query", query.fullname);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllAuthors(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/authors/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getAuthorById(session: Session, id: string): Promise<Author> {
    const url = new URL(`${Environment.API_URL}/authors/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createAuthor(session: Session, author: Partial<Author>): Promise<Author> {
    const url = new URL(`${Environment.API_URL}/authors`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(author)
    });

    return response.json();
}

export async function updateAuthor(session: Session, id: string, author: Author): Promise<Author> {
    const url = new URL(`${Environment.API_URL}/authors/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(author)
    });

    return response.json();
}

export async function deleteAuthor(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/authors/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}