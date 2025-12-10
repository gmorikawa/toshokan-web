import type { DocumentFile, NewDocumentFile } from "@/features/document/types/document-file";
import type { NewWhitepaper, Whitepaper } from "@/features/document/whitepaper/types/whitepaper";
import type { QueryOptions } from "@/types/query";
import MainService, { type Service } from "@/services";
import { removeNullishProperties } from "@/common/object";

type WhitepaperQueryOptions = QueryOptions & {
    title?: string;
};

export class WhitepaperService extends MainService implements Service {
    async getAll(query?: WhitepaperQueryOptions): Promise<Whitepaper[]> {
        const params: Record<string, string> = removeNullishProperties({
            "page": query?.pagination?.page.toString(),
            "size": query?.pagination?.size.toString(),
            "query": query?.title,
        });

        const queryString = new URLSearchParams(params).toString();
        if (queryString.length > 0) {
            return this.http.get<Whitepaper[]>(`/api/whitepapers?${queryString}`);
        }

        return this.http.get<Whitepaper[]>("/api/whitepapers");
    }

    async countAll(): Promise<number> {
        return this.http.get<number>("/api/whitepapers/count");
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
