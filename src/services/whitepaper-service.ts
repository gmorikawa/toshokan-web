import type { DocumentFile, NewDocumentFile } from "@/entities/models/document-file";
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

    async getFiles(whitepaper: Whitepaper): Promise<DocumentFile[]> {
        return this.http.get<DocumentFile[]>(`/api/whitepapers/${whitepaper.id}/files`);
    }

    async download(whitepaper: Whitepaper, documentFile: DocumentFile): Promise<Blob> {
        return this.http.get<Blob>(`/api/whitepapers/${whitepaper.id}/files/${documentFile.id}/download`);
    }

    async upload(whitepaper: Whitepaper, documentFile: NewDocumentFile): Promise<void> {
        const body = documentFile;

        return this.http.post<void>(`/api/whitepapers/${whitepaper.id}/files/upload`, { body, contentType: "form-data" });
    }

    async removeFile(whitepaper: Whitepaper, documentFile: DocumentFile): Promise<void> {
        return this.http.delete<void>(`/api/whitepapers/${whitepaper.id}/files/${documentFile.id}`);
    }
}

export default WhitepaperService;
