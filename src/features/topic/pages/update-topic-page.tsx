import type { Topic } from "@/entities/models/topic";
import { topicValidator } from "@/entities/validators/topic/topic.validator";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import TopicService from "@/services/topic-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import TopicForm from "@/features/topic/components/topic-form";

import { BackIcon } from "@/fragments/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

export function UpdateTopicPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

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
        validator: topicValidator,
        onSubmit: async (entity: Topic) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                router.navigateTo("/app/topic/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
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

            <ApplicationContent authorization={authorization}>
                <TopicForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateTopicPage;
