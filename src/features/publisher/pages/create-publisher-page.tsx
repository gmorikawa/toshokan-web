import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewPublisher } from "@features/publisher/types/publisher";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { newPublisherValidator } from "@features/publisher/utils/validators";
import { PublisherForm } from "@features/publisher/components/publisher-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { usePublisherService } from "@features/publisher/hooks/publisher-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ActionButton } from "@components/button/action-button";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@shared/icons";

export function CreatePublisherPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
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

    function handleBack(): void {
        navigate.to("/app/publisher/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Publisher"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <PublisherForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreatePublisherPage;
