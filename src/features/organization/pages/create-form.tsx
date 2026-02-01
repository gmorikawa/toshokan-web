import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { BoxContainer } from "@components/container/box-container";
import { ActionButton } from "@components/button/action-button";

import type { NewOrganization } from "@features/organization/types/organization";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useOrganizationService } from "@features/organization/hooks/organization-service";
import { newOrganizationValidator } from "@features/organization/utils/validators";
import { OrganizationForm } from "@features/organization/components/organization-form";

export function OrganizationCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useOrganizationService();
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

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/organization/list");
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Organization"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleBack}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <OrganizationForm
                    form={form}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
