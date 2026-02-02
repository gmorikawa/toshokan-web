import { Environment } from "@/config/environment";

import type { QueryOptions } from "@shared/search/types/query";
import { URLBuilder } from "@shared/http/utils/url-builder";
import { appendFiltersToURL } from "@shared/search/utils/filter";
import { appendPaginationToURL } from "@shared/search/utils/pagination";

import type { Session } from "@features/auth/types/session";
import type { User } from "@features/user/types/user";

export async function getAllUsers(session: Session, query?: QueryOptions): Promise<User[]> {
    const url = new URLBuilder(Environment.API_URL).appendPath("users");
    appendPaginationToURL(url, query?.pagination);
    appendFiltersToURL(url, query?.filters);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function countAllUsers(session: Session): Promise<number> {
    const url = new URL(`${Environment.API_URL}/users/count`);

    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function getUserById(session: Session, id: string): Promise<User> {
    const url = new URL(`${Environment.API_URL}/users/${id}`);
    const response = await fetch(url.toString(), {
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.json();
}

export async function createUser(session: Session, user: Partial<User>): Promise<User> {
    const url = new URL(`${Environment.API_URL}/users`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(user)
    });

    return response.json();
}

export async function updateUser(session: Session, id: string, user: User): Promise<User> {
    const url = new URL(`${Environment.API_URL}/users/${id}`);
    const response = await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(user)
    });

    return response.json();
}

export async function deleteUser(session: Session, id: string): Promise<boolean> {
    const url = new URL(`${Environment.API_URL}/users/${id}`);
    const response = await fetch(url.toString(), {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${session.token}`
        }
    });

    return response.ok;
}
