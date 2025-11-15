import type { NewResearchPaper, ResearchPaper } from "@/entities/models/research-paper";
import MainService, { type Service } from "@/services";

export class ResearchPaperService extends MainService implements Service {
    async getAll(): Promise<ResearchPaper[]> {
        return this.http.get<ResearchPaper[]>("/api/research-papers");
    }

    async getById(id: string): Promise<ResearchPaper> {
        return this.http.get<ResearchPaper>(`/api/research-papers/${id}`);
    }

    async create(researchPaper: NewResearchPaper): Promise<ResearchPaper> {
        const body = researchPaper;
        return this.http.post<ResearchPaper>("/api/research-papers", { body });
    }

    async update(researchPaper: ResearchPaper): Promise<ResearchPaper> {
        const body = researchPaper;
        return this.http.patch<ResearchPaper>(`/api/research-papers/${researchPaper.id}`, { body });
    }

    async remove(researchPaper: ResearchPaper): Promise<void> {
        return this.http.delete<void>(`/api/research-papers/${researchPaper.id}`);
    }
}

export default ResearchPaperService;
