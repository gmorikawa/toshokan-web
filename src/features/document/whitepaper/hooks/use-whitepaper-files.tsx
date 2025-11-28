import { useEffect, useState } from "react";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import useAlert from "@/hooks/feedback/use-alert";
import type { DocumentFile } from "@/entities/models/document-file";
import type { Whitepaper } from "@/entities/models/whitepaper";

export interface UseWhitepaperFilesResult {
    files: DocumentFile[];
}

export function useWhitepaperFiles(whitepaper: Whitepaper | null) {
    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });
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
