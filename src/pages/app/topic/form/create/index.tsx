import type { NewTopic } from "@/entities/models/topic";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import TopicService from "@/services/topic-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import TopicForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { newTopicValidator } from "@/entities/validators/topic/new-topic.validator";

export function CreateTopicFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<TopicService>(TopicService, { includeAuthorization: true });

    const form = useForm<NewTopic>({
        default: {
            name: ""
        },
        validator: newTopicValidator,
        onSubmit: async (entity: NewTopic) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/topic/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        router.navigateTo("/app/topic/list");
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

            <ApplicationContent>
                <TopicForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateTopicFormPage;
