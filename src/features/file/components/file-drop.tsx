import { useState } from "react";

import { BoxContainer } from "@components/container/box-container";
import { Paragraph } from "@components/typography/paragraph";
import type { BinaryFile } from "@shared/file/types/binary-file";

export interface FileDropProps extends React.PropsWithChildren {
    dropareaText?: string;

    onFileDrop?: (file: BinaryFile) => void;
}

export function FileDrop({
    onFileDrop,
    dropareaText,
    children
}: FileDropProps) {
    const [isHovering, setIsHovering] = useState(false);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(false);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(false);
        const file = event.dataTransfer.files[0];

        if (file && onFileDrop) {
            onFileDrop(file);
        }
    };

    return (
        <BoxContainer
            style={{ position: "relative" }}
        >
            <BoxContainer
                // pointerEvents=""
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}

                zIndex={isHovering ? 1 : undefined}
                position="absolute"
                height="100%"
                width="100%"

                style={{
                    // backgroundColor: isHovering ? "#00000033" : undefined,
                    // backdropFilter: isHovering ? "blur(2px)" : undefined,
                }}
            >
                {(isHovering && dropareaText) && (
                    <Paragraph
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            color: "white",
                            transform: "translate(-50%, -50%)",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        {dropareaText}
                    </Paragraph>
                )}
            </BoxContainer>
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
