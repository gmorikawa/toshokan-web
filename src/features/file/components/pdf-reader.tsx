import type { Nullable } from "@shared/object/types/nullable";

export interface PDFReaderProps {
    url: Nullable<string>;
}

export function PDFReader({ url }: PDFReaderProps) {
    return url && (
        <embed src={url} type="application/pdf" width="100%" height="100%">
        </embed>
    );
}
