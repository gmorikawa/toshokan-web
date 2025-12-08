import type { NewAuthor, Author } from "@/types/models/author";
import type { QueryOptions } from "@/types/query";
import MainService, { type Service } from "@/services";

import { removeNullishProperties } from "@/common/object";

type AuthorQueryOptions = QueryOptions & {
    fullname?: string;
};

export class AuthorService extends MainService implements Service {
    async getAll(query?: AuthorQueryOptions): Promise<Author[]> {
        const params: Record<string, string> = removeNullishProperties({
            "page": query?.pagination?.page.toString(),
            "size": query?.pagination?.size.toString(),
            "query": query?.fullname,
        });

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Author[]>(`/api/authors?${queryString}`);
        }

        return this.http.get<Author[]>("/api/authors");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/authors/count");
    }

    async getById(id: string): Promise<Author> {
        return this.http.get<Author>(`/api/authors/${id}`);
    }

    async create(author: NewAuthor): Promise<Author> {
        const body = author;
        return this.http.post<Author>("/api/authors", { body });
    }

    async update(author: Author): Promise<Author> {
        const body = author;
        return this.http.patch<Author>(`/api/authors/${author.id}`, { body });
    }

    async remove(author: Author): Promise<void> {
        return this.http.delete<void>(`/api/authors/${author.id}`);
    }
}

export default AuthorService;
