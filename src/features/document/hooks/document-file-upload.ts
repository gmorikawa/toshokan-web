export interface DocumentFileUploadController {

}

export function useDocumentFileUpload(
    uploadFunction: (file: File) => Promise<void>,
): DocumentFileUploadController {
    return {

    };
}