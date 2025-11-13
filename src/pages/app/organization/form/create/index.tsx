import type { NewOrganization } from "@/entities/models/organization";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import OrganizationService from "@/services/organization-service";

import useForm from "@/components/form/use-form";
import OrganizationForm from "../form";

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

    return (
        <OrganizationForm
            form={form}
            onSubmit={handleSave}
        />
    );
}

export default CreateOrganizationFormPage;
