import type { ID } from "@shared/entity/types/id";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import type { DocumentFile } from "@features/document/types/document-file";
import type { DocumentReaderController } from "@features/document/hooks/document-reader";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { useDocumentReader } from "@features/document/hooks/document-reader";

export interface ResearchPaperReaderController extends DocumentReaderController { }

export function useResearchPaperReader(researchPaper: ResearchPaper | ID, documentFile: DocumentFile | ID): ResearchPaperReaderController {
    const service = useResearchPaperService();

    return useDocumentReader(
        () => service.download(researchPaper, documentFile)
    );
}
