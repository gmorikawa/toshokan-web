import type { Topic } from "@/entities/models/topic";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import TopicService from "@/services/topic-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import TopicForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { topicValidator } from "@/entities/validators/topic/topic.validator";

type ParamsWithId = {
    id?: string;
}

export function UpdateTopicFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<TopicService>(TopicService, { includeAuthorization: true });

    const form = useForm<Topic>({
        default: {
            id: "",
            name: ""
        },
        validator: topicValidator
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Topic) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    // ...existing code...
    // Only one form declaration should exist, so replace the original with the new config above.
    // Remove the duplicate declaration.

    function handleBack(): void {
        router.navigateTo("/app/topic/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

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
                <TopicForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateTopicFormPage;
