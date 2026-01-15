import { useCallback, useEffect, useState } from "react";

import useAlert from "@components/feedback/alert/controller";
import type { DocumentFile } from "@features/document/types/document-file";
import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import type { Nullable } from "@shared/object/types/nullable";

export interface ResearchPaperFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useResearchPaperFiles(researchPaper: Nullable<ResearchPaper>): ResearchPaperFilesController {
    const service = useResearchPaperService();
    const alert = useAlert();

    const [data, setData] = useState<DocumentFile[]>([]);

    const reload = async () => {
        if (!researchPaper?.id) {
            setData([]);
            return;
        }

        return service.getFiles(researchPaper)
            .then((response: DocumentFile[]) => {
                setData(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handleDownload = useCallback((documentFile: DocumentFile) => {
        if (!researchPaper) {
            return;
        }

        service.download(researchPaper, documentFile)
            .then((blob: Blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = documentFile.file?.filename || researchPaper.title;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [researchPaper]);

    const handleRemove = useCallback((documentFile: DocumentFile) => {
        if (!researchPaper) {
            return;
        }

        service.removeFile(researchPaper, documentFile)
            .then(() => {
                alert.showMessage("File removed successfully.", "success");
                reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [researchPaper]);

    useEffect(() => {
        reload();
    }, [researchPaper]);

    return {
        data,
        reload,
        handleDownload,
        handleRemove
    };
}

export default useResearchPaperFiles;
