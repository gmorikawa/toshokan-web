import type { NewPublisher } from "@/entities/models/publisher";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import PublisherForm from "../form";

import { BackIcon } from "@/fragments/icons";

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

    function handleBack(): void {
        router.navigateTo("/app/publisher/list");
    }

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
                <PublisherForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreatePublisherFormPage;
