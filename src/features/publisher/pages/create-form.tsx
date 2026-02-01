import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BoxContainer } from "@components/container/box-container";

import type { NewPublisher } from "@features/publisher/types/publisher";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";
import { newPublisherValidator } from "@features/publisher/utils/validators";
import { PublisherForm } from "@features/publisher/components/publisher-form";

export function PublisherCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();
    const service = usePublisherService();
    const form = useForm<NewPublisher>({
        default: {
            name: "",
            description: ""
        },
        validator: newPublisherValidator,
        onSubmit: async (entity: NewPublisher) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/publisher/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/publisher/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Publisher"
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
                <PublisherForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
