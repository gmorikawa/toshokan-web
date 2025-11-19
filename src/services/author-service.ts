import type { NewAuthor, Author } from "@/entities/models/author";
import type { QueryOptions } from "@/entities/query";
import MainService, { type Service } from "@/services";

export class AuthorService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<Author[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

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
