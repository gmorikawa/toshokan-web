import type { NewOrganization } from "@/entities/models/organization";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import OrganizationForm from "../form";

import { BackIcon } from "@/fragments/icons";

export function CreateOrganizationFormPage() {
    const alert = useAlert();
    const router = useRouter();

    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    const form = useForm<NewOrganization>({
        default: {
            name: "",
            description: "",
            type: "UNIVERSITY"
        }
    });

    function handleSave(entity: NewOrganization): void {
        service.create(entity)
            .then(() => {
                router.navigateTo("/app/organization/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

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
                <OrganizationForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateOrganizationFormPage;
