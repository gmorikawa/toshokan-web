import { useEffect, useState } from "react";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import useAlert from "@/components/feedback/use-alert";
import type { DocumentFile } from "@/types/models/document-file";
import type { ResearchPaper } from "@/types/models/research-paper";

export interface UseResearchPaperFilesResult {
    files: DocumentFile[];
}

export function useResearchPaperFiles(researchPaper: ResearchPaper | null) {
    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });
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
