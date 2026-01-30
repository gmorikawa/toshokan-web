import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import type { NewTopic } from "@features/topic/types/topic";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useTopicService } from "@features/topic/hooks/topic-service";
import { newTopicValidator } from "@features/topic/utils/validators";
import { TopicForm } from "@features/topic/components/topic-form";

export function CreateTopicFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();
    const service = useTopicService();
    const form = useForm<NewTopic>({
        default: {
            name: ""
        },
        validator: newTopicValidator,
        onSubmit: async (entity: NewTopic) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                navigate.to("/app/topic/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/topic/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Topic"
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
                <TopicForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
