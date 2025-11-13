import type { Topic } from "@/entities/topic";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import TopicService from "@/services/topic-service";

import useForm from "@/components/form/use-form";
import TopicForm from "../form";

type ParamsWithId = {
    id?: string;
}

export function UpdateTopicFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<TopicService>(TopicService, { includeAuthorization: true });

    const form = useForm<Topic>({
        default: {
            id: "",
            name: ""
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

    function handleSave(): void {
        service.update(form.entity)
            .then(() => {
                router.navigateTo("/app/topic/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <TopicForm form={form} onSubmit={handleSave} />
    );
}

export default UpdateTopicFormPage;
