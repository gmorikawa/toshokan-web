import type { Publisher } from "@/entities/models/publisher";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import PublisherForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { publisherValidator } from "@/entities/validators/publisher/publisher.validator";

type ParamsWithId = {
    id?: string;
}

export function UpdatePublisherFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const form = useForm<Publisher>({
        default: {
            id: "",
            name: "",
            description: ""
        },
        validator: publisherValidator
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

    // ...existing code...
    // Only one form declaration should exist, so replace the original with the new config above.
    // Remove the duplicate declaration.

    function handleBack(): void {
        router.navigateTo("/app/publisher/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Publisher"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <PublisherForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdatePublisherFormPage;
