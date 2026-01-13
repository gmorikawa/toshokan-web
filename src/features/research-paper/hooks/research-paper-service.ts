import { useSession } from "@features/auth/hooks/session";
import type { ResearchPaper, NewResearchPaper } from "@features/research-paper/types/research-paper";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import { countAllResearchPapers,
    createResearchPaper,
    deleteResearchPaper,
    deleteResearchPaperFile,
    downloadResearchPaperFile,
    getAllResearchPapers,
    getResearchPaperById,
    getResearchPaperFiles,
    updateResearchPaper,
    uploadResearchPaperFile
} from "@features/research-paper/utils/api";
import type { ResearchPaperQueryOptions } from "../types/query";

export interface ResearchPaperService {
    getAll(query?: ResearchPaperQueryOptions): Promise<ResearchPaper[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<ResearchPaper>;
    create(researchPaper: NewResearchPaper): Promise<ResearchPaper>;
    update(researchPaper: ResearchPaper): Promise<ResearchPaper>;
    delete(researchPaper: ResearchPaper): Promise<boolean>;
    getFiles(researchPaper: ResearchPaper): Promise<DocumentFile[]>;
    download(researchPaper: ResearchPaper, documentFile: DocumentFile): Promise<Blob>;
    upload(researchPaper: ResearchPaper, documentFile: NewDocumentFile): Promise<boolean>;
    removeFile(researchPaper: ResearchPaper, documentFile: DocumentFile): Promise<boolean>;
}

export function useResearchPaperService(): ResearchPaperService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: ResearchPaperQueryOptions) => getAllResearchPapers(session, query),
        getById: async (id: string) => getResearchPaperById(session, id),
        countAll: async () => countAllResearchPapers(session),
        create: async (researchPaper: NewResearchPaper) => createResearchPaper(session, researchPaper),
        update: async (researchPaper: ResearchPaper) => updateResearchPaper(session, researchPaper.id, researchPaper),
        delete: async (researchPaper: ResearchPaper) => deleteResearchPaper(session, researchPaper.id),
        getFiles: async (researchPaper: ResearchPaper) => getResearchPaperFiles(session, researchPaper.id),
        download: async (researchPaper: ResearchPaper, documentFile: DocumentFile) => downloadResearchPaperFile(session, researchPaper.id, documentFile.id),
        upload: async (researchPaper: ResearchPaper, documentFile: NewDocumentFile) => uploadResearchPaperFile(session, researchPaper.id, documentFile),
        removeFile: async (researchPaper: ResearchPaper, documentFile: DocumentFile) => deleteResearchPaperFile(session, researchPaper.id, documentFile.id)
    }
}
