import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewTopic } from "@features/topic/types/topic";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { newTopicValidator } from "@features/topic/utils/validators";
import { TopicForm } from "@features/topic/components/topic-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useTopicService } from "@features/topic/hooks/topic-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@/common/icons";

export function CreateTopicPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
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

    function handleBack(): void {
        navigate.to("/app/topic/list");
    }

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
                <TopicForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateTopicPage;
