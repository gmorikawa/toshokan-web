import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from '@shared/router/hooks/navigator';

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { BackIcon } from "@/common/icons";
import { useWhitepaper } from "../hooks/use-whitepaper";
import { WhitepaperInfo } from "../components/whitepaper-info";
import { useWhitepaperFiles } from "../hooks/use-whitepaper-files";

type ParamsWithId = {
    id: string;
}

export function WhitepaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { whitepaper } = useWhitepaper(id);
    const { files } = useWhitepaperFiles(whitepaper);

    const navigate = useNavigator();

    function handleBack(): void {
        navigate.to("/app/whitepaper/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {(whitepaper) && <WhitepaperInfo whitepaper={whitepaper} files={files} />}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default WhitepaperDetailsPage;
