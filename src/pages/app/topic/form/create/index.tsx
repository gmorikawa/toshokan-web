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

export function CreateTopicFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<TopicService>(TopicService, { includeAuthorization: true });

    const form = useForm<NewTopic>({
        default: {
            name: ""
        }
    });

    function handleSave(entity: NewTopic): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/topic/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    function handleBack(): void {
        router.navigateTo("/app/topic/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Topic"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <TopicForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateTopicFormPage;
