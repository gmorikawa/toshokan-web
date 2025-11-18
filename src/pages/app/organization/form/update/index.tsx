import type { Organization } from "@/entities/models/organization";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import OrganizationForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { organizationValidator } from "@/entities/validators/organization/organization.validator";

type ParamsWithId = {
    id?: string;
}

export function UpdateOrganizationFormPage() {
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

            <ApplicationContent>
                <OrganizationForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateOrganizationFormPage;
