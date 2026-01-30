import { useCallback, useState } from "react";

import { BoxContainer } from "@components/container/box-container";
import { Paragraph } from "@components/typography/paragraph";
import type { BinaryFile } from "@shared/file/types/binary-file";

export interface FileDropProps extends React.PropsWithChildren {
    onFileDrop?: (file: BinaryFile) => void;
}

export function FileDrop({ onFileDrop, children }: FileDropProps) {
    const [isHovering, setIsHovering] = useState(false);

    const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        console.log("drag enter - hover true");
        event.preventDefault();
        setIsHovering(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        console.log("drag leave - hover false");
        event.preventDefault();
        setIsHovering(false);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        console.log("drag drop - hover false");
        event.preventDefault();
        setIsHovering(false);
        const file = event.dataTransfer.files[0];

        if (file && onFileDrop) {
            onFileDrop(file);
        }
    }, []);

    return (
        <BoxContainer
            fullHeight
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}

            style={{
                outline: isHovering ? "2px dashed black" : "1px solid black",
                position: "relative",
                backgroundColor: isHovering ? "#00000055" : undefined,
                backdropFilter: isHovering ? "blur(2px)" : undefined,
            }}
        >
            {children}
            {(isHovering) && (
                <BoxContainer
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <Paragraph>
                        
                    </Paragraph>
                </BoxContainer>
            )}
        </BoxContainer>
    );
}
