import type { NewLanguage, Language } from "@/entities/models/language";
import type { QueryOptions } from "@/entities/query";
import MainService, { type Service } from "@/services";

export class LanguageService extends MainService implements Service {
    async getAll(options?: QueryOptions): Promise<Language[]> {
        const params: Record<string, string> = {
            ...(options?.pagination ? {
                "page": options.pagination.page.toString(),
                "size": options.pagination.size.toString(),
            } : {}),
        };

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Language[]>(`/api/languages?${queryString}`);
        }

        return this.http.get<Language[]>("/api/languages");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/languages/count");
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
