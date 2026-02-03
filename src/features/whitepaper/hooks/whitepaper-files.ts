import type { ID } from "@shared/entity/types/id";
import { getID } from "@shared/entity/utils/id";

import { useAlert } from "@components/feedback/alert/controller";

import type { DocumentFile } from "@features/document/types/document-file";
import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useDocumentFiles } from "@features/document/hooks/document-files";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

export interface WhitepaperFilesController {
    data: DocumentFile[];

    reload: () => Promise<void>;

    handleDownload: (documentFile: DocumentFile) => void;
    handleRemove: (documentFile: DocumentFile) => void;
}

export function useWhitepaperFiles(whitepaper: Whitepaper | ID): WhitepaperFilesController {
    const service = useWhitepaperService();
    const alert = useAlert();

    return useDocumentFiles<Whitepaper>({
        document: whitepaper,
        fetchFiles: async () => {
            const id = getID(whitepaper);

            if (id === undefined || id === null || id === "") {
                return [];
            }

            return service.getFiles(whitepaper);
        },
        download: async (documentFile: DocumentFile) => {
            return service.download(whitepaper, documentFile)
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                    return null;
                });
        },
        remove: async (documentFile: DocumentFile) => {
            return service.removeFile(whitepaper, documentFile)
                .then(() => {
                    alert.showMessage("File removed successfully.", "success");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        },
    });
}
