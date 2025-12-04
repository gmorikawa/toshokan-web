import type { Publisher } from "@/types/models/publisher";
import { publisherValidator } from "@/types/validators/publisher/publisher.validator";

import { useEffect } from "react";
import useAlert from "@/components/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import PublisherForm from "@/features/publisher/components/publisher-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

export function UpdatePublisherPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

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
        validator: publisherValidator,
        onSubmit: async (entity: Publisher) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                router.navigateTo("/app/publisher/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
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

            <ApplicationContent authorization={authorization}>
                <PublisherForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdatePublisherPage;
