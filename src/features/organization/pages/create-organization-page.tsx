import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewOrganization } from "@features/organization/types/organization";
import { newOrganizationValidator } from "@features/organization/utils/validators";
import { useAuthorizationFilter } from "@features/auth/hooks/use-authorization-filter";
import { OrganizationForm } from "@features/organization/components/organization-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useService } from "@/services/use-service";
import { OrganizationService } from "@/services/organization-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import { BackIcon } from "@/common/icons";

export function CreateOrganizationPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();

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
                    navigate.to("/app/organization/list");
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
        navigate.to("/app/organization/list");
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

            <ApplicationContent authorization={authorization}>
                <OrganizationForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateOrganizationPage;
