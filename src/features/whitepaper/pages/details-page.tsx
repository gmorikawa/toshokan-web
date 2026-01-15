import { useWhitepaper } from "@features/whitepaper/hooks/whitepaper";
import { WhitepaperInfo } from "@features/whitepaper/components/whitepaper-info";
import { useWhitepaperFiles } from "@features/whitepaper/hooks/whitepaper-files";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@shared/icons";
import { useCallback } from "react";

type ParamsWithId = {
    id: string;
}

export function WhitepaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { whitepaper } = useWhitepaper(id);
    const files = useWhitepaperFiles(whitepaper);
    const navigate = useNavigator();

    const handleBack = useCallback(() => {
        navigate.to("/app/whitepaper/list");
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
                {(whitepaper) && (
                    <WhitepaperInfo
                        whitepaper={whitepaper}
                        files={files.data}
                        onDownload={files.handleDownload}
                        onRemove={files.handleRemove}
                    />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default WhitepaperDetailsPage;
