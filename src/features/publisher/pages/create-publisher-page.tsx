import type { NewPublisher } from "@/types/models/publisher";
import { newPublisherValidator } from "@/types/validators/publisher/new-publisher.validator";

import useAlert from "@/components/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ActionButton from "@/components/button/action-button";
import ApplicationContent from "@/layout/content";
import BoxContainer from "@/components/container/box-container";
import PublisherForm from "@/features/publisher/components/publisher-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function CreatePublisherPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });

    const form = useForm<NewPublisher>({
        default: {
            name: "",
            description: ""
        },
        validator: newPublisherValidator,
        onSubmit: async (entity: NewPublisher) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/publisher/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

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

            <ApplicationContent authorization={authorization}>
                <PublisherForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreatePublisherPage;
