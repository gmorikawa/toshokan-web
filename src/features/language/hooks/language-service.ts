import type { QueryOptions } from "@shared/search/types/query";
import type { PageCount } from "@shared/search/types/pagination";
import type { ID } from "@shared/entity/types/id";

import { useSession } from "@features/auth/hooks/session";
import type { Language, NewLanguage } from "@features/language/types/language";
import {
    countAllLanguages,
    createLanguage,
    deleteLanguage,
    getAllLanguages,
    getLanguageById,
    updateLanguage
} from "@features/language/utils/api";

export interface LanguageService {
    getAll(query?: QueryOptions): Promise<Language[]>;
    countAll(): Promise<PageCount>;
    getById(id: ID): Promise<Language>;
    create(language: NewLanguage): Promise<Language>;
    update(language: Language): Promise<Language>;
    delete(language: Language): Promise<boolean>;
}

export function useLanguageService(): LanguageService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: QueryOptions) => getAllLanguages(session, query),
        getById: async (id: ID) => getLanguageById(session, id),
        countAll: async () => countAllLanguages(session),
        create: async (language: NewLanguage) => createLanguage(session, language),
        update: async (language: Language) => updateLanguage(session, language.id, language),
        delete: async (language: Language) => deleteLanguage(session, language.id)
    }
}
