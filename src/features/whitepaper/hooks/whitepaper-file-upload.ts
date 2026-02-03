import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import type { NewDocumentFile } from "@features/document/types/document-file";
import type { DocumentFileUploadController } from "@features/document/hooks/document-file-upload";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";
import { useDocumentFileUpload } from "@features/document/hooks/document-file-upload";

export interface WhitepaperFileUploadController extends DocumentFileUploadController<Whitepaper> { }

export function useWhitepaperFileUpload() {
    const service = useWhitepaperService();

    return useDocumentFileUpload<Whitepaper>(
        async (whitepaper: Whitepaper, newDocumentFile: NewDocumentFile) => {
            await service.upload(whitepaper, newDocumentFile);
        }
    );
}
