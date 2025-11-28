import useRouter from "@/hooks/router/use-router";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { BackIcon } from "@/fragments/icons";
import { useWhitepaper } from "../hooks/use-whitepaper";
import useParams from "@/hooks/router/use-params";
import { WhitepaperInfo } from "../components/whitepaper-info";
import { useWhitepaperFiles } from "../hooks/use-whitepaper-files";

type ParamsWithId = {
    id: string;
}

export function WhitepaperDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { whitepaper } = useWhitepaper(id);
    const { files } = useWhitepaperFiles(whitepaper);

    const router = useRouter();

    function handleBack(): void {
        router.navigateTo("/app/whitepaper/list");
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
