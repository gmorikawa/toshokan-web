import { useEffect, useState } from "react";

import type { Nullable } from "@shared/object/types/nullable";
import type { FileType } from "@features/file/types/file";
import { PDFReader } from "@features/file/components/pdf-reader";
import { EPUBReader } from "@features/file/components/epub-reader";

export interface DocumentReaderProps {
    fileType: FileType;
    data: Nullable<Blob>;
}

export function DocumentReader({ fileType, data }: DocumentReaderProps) {
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

    switch (fileType?.mimeType) {
        case "application/pdf":
            return <PDFReader url={url} />;
        case "application/epub+zip":
            return <EPUBReader url={url} />;
        default:
            return null;
    }
}