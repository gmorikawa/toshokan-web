import { useEffect, useState } from "react";

import useAlert from "@components/feedback/use-alert";
import type { DocumentFile } from "@features/document/types/document-file";
import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

export interface UseResearchPaperFilesResult {
    files: DocumentFile[];
}

export function useResearchPaperFiles(researchPaper: ResearchPaper | null) {
    const service = useResearchPaperService();
    const alert = useAlert();

    const [files, setFiles] = useState<DocumentFile[]>([]);

    useEffect(() => {
        if (researchPaper) {
            service.getFiles(researchPaper)
                .then((response: DocumentFile[]) => {
                    setFiles(response);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    }, [researchPaper]);

    return {
        files
    };
}

export default useResearchPaperFiles;
