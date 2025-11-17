import type { DocumentFile, NewDocumentFile } from "@/entities/models/document-file";
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

    async getFiles(researchPaper: ResearchPaper): Promise<DocumentFile[]> {
        return this.http.get<DocumentFile[]>(`/api/research-papers/${researchPaper.id}/files`);
    }

    async download(researchPaper: ResearchPaper, documentFile: DocumentFile): Promise<Blob> {
        return this.http.get<Blob>(`/api/research-papers/${researchPaper.id}/files/${documentFile.id}/download`);
    }

    async upload(researchPaper: ResearchPaper, documentFile: NewDocumentFile): Promise<void> {
        const body = documentFile;

        return this.http.post<void>(`/api/research-papers/${researchPaper.id}/files/upload`, { body, contentType: "form-data" });
    }

    async removeFile(researchPaper: ResearchPaper, documentFile: DocumentFile): Promise<void> {
        return this.http.delete<void>(`/api/research-papers/${researchPaper.id}/files/${documentFile.id}`);
    }
}

export default ResearchPaperService;
