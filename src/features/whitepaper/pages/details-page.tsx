import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { BackIcon } from "@shared/icons";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";

import type { DocumentFile } from "@features/document/types/document-file";
import { useWhitepaper } from "@features/whitepaper/hooks/whitepaper";
import { WhitepaperInfo } from "@features/whitepaper/components/whitepaper-info";
import { useWhitepaperFiles } from "@features/whitepaper/hooks/whitepaper-files";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";
import { useCallback } from "react";

type ParamsWithId = {
    id: string;
}

export function WhitepaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const whitepaper = useWhitepaper(id);
    const files = useWhitepaperFiles(whitepaper.entity);
    const navigate = useNavigator();

    const handleBack = useCallback(() => {
        navigate.to("/app/whitepaper/list");
    }, []);

    const handleRead = useCallback((documentFile: DocumentFile) => {
        navigate.to(`/app/whitepaper/details/${id}/read/${documentFile.id}`);
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleBack}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {(whitepaper.entity) && (
                    <WhitepaperInfo
                        whitepaper={whitepaper.entity}
                        files={files.data}
                        onDownload={files.handleDownload}
                        onRemove={files.handleRemove}
                        onRead={handleRead}
                    />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default WhitepaperDetailsPage;
