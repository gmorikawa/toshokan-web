import { useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";

import type { FetchState } from "@layout/loader";

import { useAlert } from "@components/feedback/alert/controller";

export interface DocumentReaderController {
    blob: Nullable<Blob>;
    state: FetchState;
}

export function useDocumentReader(
    fetchDocument: () => Promise<Blob>,
): DocumentReaderController {
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
    return {
        blob,
        state,
    };
}