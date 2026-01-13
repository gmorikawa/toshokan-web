import { useEffect, useState } from "react";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile } from "@features/document/types/document-file";

import useAlert from "@components/feedback/use-alert";
import { useWhitepaperService } from "./whitepaper-service";

export interface UseWhitepaperFilesResult {
    files: DocumentFile[];
}

export function useWhitepaperFiles(whitepaper: Whitepaper | null) {
    const service = useWhitepaperService();
    const alert = useAlert();

    const [files, setFiles] = useState<DocumentFile[]>([]);

    useEffect(() => {
        if (whitepaper) {
            service.getFiles(whitepaper)
                .then((response: DocumentFile[]) => {
                    setFiles(response);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    }, [whitepaper]);

    return {
        files
    };
}

export default useWhitepaperFiles;
