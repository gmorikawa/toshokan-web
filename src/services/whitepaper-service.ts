import type { NewWhitepaper, Whitepaper } from "@/entities/models/whitepaper";
import MainService, { type Service } from "@/services";

export class WhitepaperService extends MainService implements Service {
    async getAll(): Promise<Whitepaper[]> {
        return this.http.get<Whitepaper[]>("/api/whitepapers");
    }

    async getById(id: string): Promise<Whitepaper> {
        return this.http.get<Whitepaper>(`/api/whitepapers/${id}`);
    }

    async create(whitepaper: NewWhitepaper): Promise<Whitepaper> {
        const body = whitepaper;
        return this.http.post<Whitepaper>("/api/whitepapers", { body });
    }

    async update(whitepaper: Whitepaper): Promise<Whitepaper> {
        const body = whitepaper;
        return this.http.patch<Whitepaper>(`/api/whitepapers/${whitepaper.id}`, { body });
    }

    async remove(whitepaper: Whitepaper): Promise<void> {
        return this.http.delete<void>(`/api/whitepapers/${whitepaper.id}`);
    }
}

export default WhitepaperService;
