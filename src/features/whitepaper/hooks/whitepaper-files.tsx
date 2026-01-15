import { useCallback, useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { DocumentFile } from "@features/document/types/document-file";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

import { useAlert } from "@components/feedback/alert/controller";

export interface WhitepaperFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useWhitepaperFiles(whitepaper: Nullable<Whitepaper>): WhitepaperFilesController {
    const service = useWhitepaperService();
    const alert = useAlert();

    const [data, setData] = useState<DocumentFile[]>([]);

    const reload = async () => {
        if (!whitepaper?.id) {
            setData([]);
            return;
        }

        return service.getFiles(whitepaper)
            .then((response: DocumentFile[]) => {
                setData(response);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handleDownload = useCallback((documentFile: DocumentFile) => {
        if (!whitepaper) {
            return;
        }

        service.download(whitepaper, documentFile)
            .then((blob: Blob) => {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = documentFile.file?.filename || whitepaper.title;
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [whitepaper]);

    const handleRemove = useCallback((documentFile: DocumentFile) => {
        if (!whitepaper) {
            return;
        }

        service.removeFile(whitepaper, documentFile)
            .then(() => {
                alert.showMessage("File removed successfully.", "success");
                reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, [whitepaper]);

    useEffect(() => {
        reload();
    }, [whitepaper]);

    return {
        data,
        reload,
        handleDownload,
        handleRemove
    };
}

export default useWhitepaperFiles;
