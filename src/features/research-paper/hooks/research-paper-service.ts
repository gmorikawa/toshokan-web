import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

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
    getResearchPaperFile,
    getResearchPaperFiles,
    updateResearchPaper,
    uploadResearchPaperFile
} from "@features/research-paper/utils/api";
import type { ResearchPaperQueryOptions } from "../types/query";

export interface ResearchPaperService {
    getAll(query?: ResearchPaperQueryOptions): Promise<ResearchPaper[]>;
    countAll(): Promise<number>;
    getById(id: ID): Promise<ResearchPaper>;
    create(researchPaper: NewResearchPaper): Promise<ResearchPaper>;
    update(researchPaper: ResearchPaper): Promise<ResearchPaper>;
    delete(researchPaper: ResearchPaper | ID): Promise<boolean>;
    getFiles(researchPaper: ResearchPaper | ID): Promise<DocumentFile[]>;
    getFile(researchPaper: ResearchPaper | ID, documentFile: ID): Promise<DocumentFile>;
    download(researchPaper: ResearchPaper | ID, documentFile: DocumentFile | ID): Promise<Blob>;
    upload(researchPaper: ResearchPaper | ID, documentFile: NewDocumentFile): Promise<boolean>;
    removeFile(researchPaper: ResearchPaper | ID, documentFile: DocumentFile | ID): Promise<boolean>;
}

export function useResearchPaperService(): ResearchPaperService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: ResearchPaperQueryOptions) => getAllResearchPapers(session, query),
        getById: async (id: ID) => getResearchPaperById(session, id),
        countAll: async () => countAllResearchPapers(session),
        create: async (researchPaper: NewResearchPaper) => createResearchPaper(session, researchPaper),
        update: async (researchPaper: ResearchPaper) => updateResearchPaper(session, researchPaper.id, researchPaper),
        delete: async (researchPaper: ResearchPaper | ID) => deleteResearchPaper(session, getID(researchPaper)),
        getFiles: async (researchPaper: ResearchPaper | ID) => getResearchPaperFiles(session, getID(researchPaper)),
        getFile: async (researchPaper: ResearchPaper | ID, documentFile: ID) => getResearchPaperFile(session, getID(researchPaper), getID(documentFile)),
        download: async (researchPaper: ResearchPaper | ID, documentFile: DocumentFile | ID) => downloadResearchPaperFile(session, getID(researchPaper), getID(documentFile)),
        upload: async (researchPaper: ResearchPaper | ID, documentFile: NewDocumentFile) => uploadResearchPaperFile(session, getID(researchPaper), documentFile),
        removeFile: async (researchPaper: ResearchPaper | ID, documentFile: DocumentFile | ID) => deleteResearchPaperFile(session, getID(researchPaper), getID(documentFile))
    }
}
