import type { NewTopic } from "@/entities/models/topic";
import { newTopicValidator } from "@/entities/validators/topic/new-topic.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import useForm from "@/components/form/use-form";
import TopicService from "@/services/topic-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";

import TopicForm from "@/features/topic/components/topic-form";

import { BackIcon } from "@/fragments/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function CreateTopicPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

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

            <ApplicationContent authorization={authorization}>
                <TopicForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateTopicPage;
