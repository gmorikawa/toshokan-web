import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import { useAlert } from "@components/feedback/alert/controller";

import type { DocumentFile } from "@features/document/types/document-file";
import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useDocumentFiles } from "@features/document/hooks/document-files";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

export interface ResearchPaperFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useResearchPaperFiles(researchPaper: ResearchPaper | ID): ResearchPaperFilesController {
    const service = useResearchPaperService();
    const alert = useAlert();

    return useDocumentFiles<ResearchPaper>({
        document: researchPaper,
        fetchFiles: async () => {
            const id = getID(researchPaper);

            if (id === undefined || id === null || id === "") {
                return [];
            }

            return service.getFiles(researchPaper);
        },
        download: async (documentFile: DocumentFile) => {
            return service.download(researchPaper, documentFile)
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return null;
                });
        },
        remove: async (documentFile: DocumentFile) => {
            return service.removeFile(researchPaper, documentFile)
                .then(() => {
                    alert.showMessage("File removed successfully.", "success");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        },
    });
}
