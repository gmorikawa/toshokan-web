import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile } from "@features/document/types/document-file";
import type { DocumentReaderController } from "@features/document/hooks/document-reader";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";
import { useDocumentReader } from "@features/document/hooks/document-reader";

export interface WhitepaperReaderController extends DocumentReaderController { }

export function useWhitepaperReader(
    whitepaper: Whitepaper | ID,
    documentFile: DocumentFile | ID
): WhitepaperReaderController {
    const service = useWhitepaperService();

    return useDocumentReader(
        () => service.download(whitepaper, documentFile),
        () => service.getFile(whitepaper, getID(documentFile)),
    );
}
