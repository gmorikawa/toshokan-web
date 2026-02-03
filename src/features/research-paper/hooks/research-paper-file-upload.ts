import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import type { NewDocumentFile } from "@features/document/types/document-file";
import type { DocumentFileUploadController } from "@features/document/hooks/document-file-upload";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { useDocumentFileUpload } from "@features/document/hooks/document-file-upload";

export interface ResearchPaperFileUploadController extends DocumentFileUploadController<ResearchPaper> { }

export function useResearchPaperFileUpload() {
    const service = useResearchPaperService();

    return useDocumentFileUpload<ResearchPaper>(
        async (researchPaper: ResearchPaper, newDocumentFile: NewDocumentFile) => {
            await service.upload(researchPaper, newDocumentFile);
        }
    );
}
