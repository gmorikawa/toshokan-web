import { useSession } from "@features/auth/hooks/session";
import type { Author, NewAuthor } from "@features/author/types/author";
import type { AuthorQueryOptions } from "@features/author/types/query";
import {
    countAllAuthors,
    createAuthor,
    deleteAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor
} from "@features/author/utils/api";

export interface AuthorService {
    getAll(query?: AuthorQueryOptions): Promise<Author[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Author>;
    create(author: NewAuthor): Promise<Author>;
    update(author: Author): Promise<Author>;
    delete(author: Author): Promise<boolean>;
}

export function useAuthorService(): AuthorService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: AuthorQueryOptions) => getAllAuthors(session, query),
        getById: async (id: string) => getAuthorById(session, id),
        countAll: async () => countAllAuthors(session),
        create: async (author: NewAuthor) => createAuthor(session, author),
        update: async (author: Author) => updateAuthor(session, author.id, author),
        delete: async (author: Author) => deleteAuthor(session, author.id)
    }
}
