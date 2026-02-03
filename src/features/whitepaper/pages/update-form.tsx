import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";
import { useWhitepaperFileUpload } from "@features/whitepaper/hooks/whitepaper-file-upload";
import { useWhitepaperFiles } from "@features/whitepaper/hooks/whitepaper-files";
import { whitepaperValidator } from "@features/whitepaper/utils/validators";
import { WhitepaperForm } from "@features/whitepaper/components/whitepaper-form";

type ParamsWithId = {
    id: string;
}

export function WhitepaperUpdateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const { id } = useParams<ParamsWithId>();
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useWhitepaperService();
    const files = useWhitepaperFiles(id);
    const uploader = useWhitepaperFileUpload();
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
            service.update(entity)
                .then((updatedWhitepaper: Whitepaper) => {
                    return uploader.upload(updatedWhitepaper);
                })
                .then(() => {
                    navigate.to("/app/whitepaper/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
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
                <WhitepaperForm
                    form={form}
                    files={files}
                    uploader={uploader}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
