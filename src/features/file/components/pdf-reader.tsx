import type { Nullable } from "@shared/object/types/nullable";
import { useEffect, useState } from "react";

export interface PDFReaderProps {
    data: Nullable<Blob>;
}

export function PDFReader({ data }: PDFReaderProps) {
    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        if (data) {
            const objectUrl = URL.createObjectURL(data);
            setUrl(objectUrl);

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        } else {
            setUrl("");
        }
    }, [data]);

    return url && (
        <embed src={url} type="application/pdf" width="100%" height="100%">
        </embed>
    );
}