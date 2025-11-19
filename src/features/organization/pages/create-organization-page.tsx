import type { NewOrganization } from "@/entities/models/organization";
import { newOrganizationValidator } from "@/entities/validators/organization/new-organization.validator";

import useAlert from "@/hooks/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import OrganizationForm from "@/features/organization/components/organization-form";

import { BackIcon } from "@/fragments/icons";

export function CreateOrganizationPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    const form = useForm<NewOrganization>({
        default: {
            name: "",
            description: "",
            type: "UNIVERSITY"
        },
        validator: newOrganizationValidator,
        onSubmit: (): void => {
            service.create(form.entity)
                .then(() => {
                    router.navigateTo("/app/organization/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    });

    function handleSubmit(): void {
        form.submit();
    }

    function handleBack(): void {
        router.navigateTo("/app/organization/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Organization"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <OrganizationForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateOrganizationPage;
