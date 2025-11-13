import type { NewAuthor, Author } from "@/entities/models/author";
import MainService, { type Service } from "@/services";

export class AuthorService extends MainService implements Service {
    async getAll(): Promise<Author[]> {
        return this.http.get<Author[]>("/api/authors");
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
