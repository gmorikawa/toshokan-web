import { useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { FetchState } from "@layout/loader";

import { useAlert } from "@components/feedback/alert/controller";

import type { DocumentFile } from "@features/document/types/document-file";

export interface DocumentReaderController {
    documentFile: Nullable<DocumentFile>;
    blob: Nullable<Blob>;
    state: FetchState;
}

export function useDocumentReader(
    fetchDocument: () => Promise<Blob>,
    fetchDocumentFile: () => Promise<DocumentFile>
): DocumentReaderController {
    const [documentFile, setDocumentFile] = useState<Nullable<DocumentFile>>(null);
    const [blob, setBlob] = useState<Nullable<Blob>>(null);
    const [state, setState] = useState<FetchState>("idle");

    const alert = useAlert();

    useEffect(() => {
        setState("loading");

        fetchDocument()
            .then((blob: Blob) => {
                setBlob(blob);
                setState("success");
            })
            .catch((error: Error) => {
                setState("error");
                setBlob(null);
                alert.showErrorMessage(error);
            });
    }, []);

    useEffect(() => {
        fetchDocumentFile()
            .then((documentFile: DocumentFile) => {
                setDocumentFile(documentFile);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }, []);
    return {
        documentFile,
        blob,
        state,
    };
}
