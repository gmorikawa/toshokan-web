import type { NewLanguage, Language } from "@/entities/models/language";
import MainService, { type Service } from "@/services";

export class LanguageService extends MainService implements Service {
    async getAll(): Promise<Language[]> {
        return this.http.get<Language[]>("/api/languages");
    }

    async getById(id: string): Promise<Language> {
        return this.http.get<Language>(`/api/languages/${id}`);
    }

    async create(language: NewLanguage): Promise<Language> {
        const body = language;
        return this.http.post<Language>("/api/languages", { body });
    }

    async update(language: Language): Promise<Language> {
        const body = language;
        return this.http.patch<Language>(`/api/languages/${language.id}`, { body });
    }

    async remove(language: Language): Promise<void> {
        return this.http.delete<void>(`/api/languages/${language.id}`);
    }
}

export default LanguageService;
