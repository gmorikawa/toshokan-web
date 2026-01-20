import { useState } from "react";
import { ReactReader } from "react-reader";

import type { Nullable } from "@shared/object/types/nullable";

import { BoxContainer } from "@components/container/box-container";

export interface EPUBReaderProps {
    url: Nullable<string>;
}

export function EPUBReader({ url }: EPUBReaderProps) {
    const [location, setLocation] = useState<string | number>(0);

    return url && (
        <BoxContainer width="100%" height="100%">
            <ReactReader
                url={url}
                location={location}
                locationChanged={(epubcfi: string) => setLocation(epubcfi)}
                epubInitOptions={{
                    openAs: "epub"
                }}
            />
        </BoxContainer>
    );
}
