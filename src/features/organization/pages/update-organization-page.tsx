import type { Organization } from "@/features/organization/types/organization";
import { organizationValidator } from "@/features/organization/validators/organization.validator";

import { useEffect } from "react";
import useAlert from "@/components/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import OrganizationForm from "@/features/organization/components/organization-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

export function UpdateOrganizationPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<OrganizationService>(OrganizationService, { includeAuthorization: true });

    const form = useForm<Organization>({
        default: {
            id: "",
            name: "",
            description: "",
            type: "UNIVERSITY"
        },
        validator: organizationValidator,
        onSubmit: (): void => {
            service.update(form.entity)
                .then(() => {
                    router.navigateTo("/app/organization/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Organization) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    function handleSubmit(): void {
        form.submit();
    }

    function handleBack(): void {
        router.navigateTo("/app/organization/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

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

export default UpdateOrganizationPage;
