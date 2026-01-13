import { useSession } from "@features/auth/hooks/session";
import type { Whitepaper, NewWhitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile, NewDocumentFile } from "@features/document/types/document-file";
import { countAllWhitepapers,
    createWhitepaper,
    deleteWhitepaper,
    deleteWhitepaperFile,
    downloadWhitepaperFile,
    getAllWhitepapers,
    getWhitepaperById,
    getWhitepaperFiles,
    updateWhitepaper,
    uploadWhitepaperFile
} from "@features/whitepaper/utils/api";
import type { WhitepaperQueryOptions } from "@features/whitepaper/types/query";

export interface WhitepaperService {
    getAll(query?: WhitepaperQueryOptions): Promise<Whitepaper[]>;
    countAll(): Promise<number>;
    getById(id: string): Promise<Whitepaper>;
    create(whitepaper: NewWhitepaper): Promise<Whitepaper>;
    update(whitepaper: Whitepaper): Promise<Whitepaper>;
    delete(whitepaper: Whitepaper): Promise<boolean>;
    getFiles(whitepaper: Whitepaper): Promise<DocumentFile[]>;
    download(whitepaper: Whitepaper, documentFile: DocumentFile): Promise<Blob>;
    upload(whitepaper: Whitepaper, documentFile: NewDocumentFile): Promise<boolean>;
    removeFile(whitepaper: Whitepaper, documentFile: DocumentFile): Promise<boolean>;
}

export function useWhitepaperService(): WhitepaperService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: WhitepaperQueryOptions) => getAllWhitepapers(session, query),
        getById: async (id: string) => getWhitepaperById(session, id),
        countAll: async () => countAllWhitepapers(session),
        create: async (whitepaper: NewWhitepaper) => createWhitepaper(session, whitepaper),
        update: async (whitepaper: Whitepaper) => updateWhitepaper(session, whitepaper.id, whitepaper),
        delete: async (whitepaper: Whitepaper) => deleteWhitepaper(session, whitepaper.id),
        getFiles: async (whitepaper: Whitepaper) => getWhitepaperFiles(session, whitepaper.id),
        download: async (whitepaper: Whitepaper, documentFile: DocumentFile) => downloadWhitepaperFile(session, whitepaper.id, documentFile.id),
        upload: async (whitepaper: Whitepaper, documentFile: NewDocumentFile) => uploadWhitepaperFile(session, whitepaper.id, documentFile),
        removeFile: async (whitepaper: Whitepaper, documentFile: DocumentFile) => deleteWhitepaperFile(session, whitepaper.id, documentFile.id)
    }
}
