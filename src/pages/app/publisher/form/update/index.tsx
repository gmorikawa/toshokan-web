import type { Publisher } from "@/entities/models/publisher";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import useForm from "@/components/form/use-form";
import PublisherForm from "../form";

type ParamsWithId = {
    id?: string;
}

export function UpdatePublisherFormPage() {
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const form = useForm<Publisher>({
        default: {
            id: "",
            name: "",
            description: ""
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Publisher) => {
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
                router.navigateTo("/app/publisher/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <PublisherForm form={form} onSubmit={handleSave} />
    );
}

export default UpdatePublisherFormPage;
