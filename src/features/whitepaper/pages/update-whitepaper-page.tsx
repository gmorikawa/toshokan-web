import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useQuery } from "@shared/router/hooks/query";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon, FileUploadIcon, FormIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";
import { TabContent } from "@components/tab/tab-content";
import { TabControl, type TabOption } from "@components/tab/tab-control";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";
import { whitepaperValidator } from "@features/whitepaper/utils/validators";
import { WhitepaperForm } from "@features/whitepaper/components/whitepaper-form";
import { WhitepaperFileUpload } from "@features/whitepaper/components/whitepaper-file-upload";

type ParamsWithId = {
    id?: string;
}

type QueryWithTab = {
    tab?: WhitepaperFormTab;
}

type WhitepaperFormTab = "details" | "files";

const whitepaperFormTabOptions: TabOption<WhitepaperFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];

export function UpdateWhitepaperFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const { id } = useParams<ParamsWithId>();
    const { tab } = useQuery<QueryWithTab>();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useWhitepaperService();
    const form = useForm<Whitepaper>({
        default: {
            id: "",
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            organization: null,
            documentFiles: [],
            publishingYear: null,
        },
        validator: whitepaperValidator,
        onSubmit: async (entity: Whitepaper) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                navigate.to("/app/whitepaper/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Whitepaper) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/whitepaper/list");
    };

    useEffect(() => {
        loadEntity();
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

            <ApplicationContent authorization={authorization}>
                <TabControl defaultTab={tab ?? "details"} options={whitepaperFormTabOptions}>
                    <TabContent tab="details">
                        <WhitepaperForm
                            form={form}
                            onSubmit={handleSubmit}
                        />
                    </TabContent>

                    <TabContent tab="files">
                        <WhitepaperFileUpload
                            whitepaper={form.entity}
                        />
                    </TabContent>
                </TabControl>
            </ApplicationContent>
        </ApplicationPage>
    );
}
