import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

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
    getById(id: ID): Promise<Whitepaper>;
    create(whitepaper: NewWhitepaper): Promise<Whitepaper>;
    update(whitepaper: Whitepaper): Promise<Whitepaper>;
    delete(whitepaper: Whitepaper | ID): Promise<boolean>;
    getFiles(whitepaper: Whitepaper | ID): Promise<DocumentFile[]>;
    download(whitepaper: Whitepaper | ID, documentFile: DocumentFile | ID): Promise<Blob>;
    upload(whitepaper: Whitepaper | ID, documentFile: NewDocumentFile): Promise<boolean>;
    removeFile(whitepaper: Whitepaper | ID, documentFile: DocumentFile | ID): Promise<boolean>;
}

export function useWhitepaperService(): WhitepaperService {
    const { session } = useSession();

    if (!session) {
        throw new Error("No session available");
    }

    return {
        getAll: async (query?: WhitepaperQueryOptions) => getAllWhitepapers(session, query),
        getById: async (id: ID) => getWhitepaperById(session, id),
        countAll: async () => countAllWhitepapers(session),
        create: async (whitepaper: NewWhitepaper) => createWhitepaper(session, whitepaper),
        update: async (whitepaper: Whitepaper) => updateWhitepaper(session, whitepaper.id, whitepaper),
        delete: async (whitepaper: Whitepaper | ID) => deleteWhitepaper(session, getID(whitepaper)),
        getFiles: async (whitepaper: Whitepaper | ID) => getWhitepaperFiles(session, getID(whitepaper)),
        download: async (whitepaper: Whitepaper | ID, documentFile: DocumentFile | ID) => downloadWhitepaperFile(session, getID(whitepaper), getID(documentFile)),
        upload: async (whitepaper: Whitepaper | ID, documentFile: NewDocumentFile) => uploadWhitepaperFile(session, getID(whitepaper), documentFile),
        removeFile: async (whitepaper: Whitepaper | ID, documentFile: DocumentFile | ID) => deleteWhitepaperFile(session, getID(whitepaper), getID(documentFile))
    }
}
