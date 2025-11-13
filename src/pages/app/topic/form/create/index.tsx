import type { NewTopic } from "@/entities/topic";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import TopicService from "@/services/topic-service";

import useForm from "@/components/form/use-form";
import TopicForm from "../form";

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

    return (
        <TopicForm
            form={form}
            onSubmit={handleSave}
        />
    );
}

export default CreateTopicFormPage;
