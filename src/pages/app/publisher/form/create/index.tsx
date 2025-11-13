import type { NewPublisher } from "@/entities/models/publisher";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import useForm from "@/components/form/use-form";
import PublisherForm from "../form";

export function CreatePublisherFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const form = useForm<NewPublisher>({
        default: {
            name: "",
            description: ""
        }
    });

    function handleSave(entity: NewPublisher): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/publisher/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    return (
        <PublisherForm
            form={form}
            onSubmit={handleSave}
        />
    );
}

export default CreatePublisherFormPage;
