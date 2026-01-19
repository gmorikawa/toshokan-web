import { useParams } from "@shared/router/hooks/params";
import { BackIcon } from "@shared/icons";

import { ApplicationContent } from "@layout/content";
import { ApplicationHeader } from "@layout/header";
import { ApplicationPage } from "@layout/page";

import { useWhitepaperReader } from "@features/whitepaper/hooks/whitepaper-reader";
import { PDFReader } from "@features/file/components/pdf-reader";

import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

type ParamsWithId = {
    whitepaperId: string;
    documentFileId: string;
}

export function ReadWhitepaperPage() {
    const { whitepaperId, documentFileId } = useParams<ParamsWithId>();

    const reader = useWhitepaperReader(whitepaperId, documentFileId);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={() => null}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {(reader.state === "success") && (
                    <PDFReader data={reader.blob} />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ReadWhitepaperPage;
