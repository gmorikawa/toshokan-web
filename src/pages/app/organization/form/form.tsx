import SubmitButton from "@/components/button/submit-button";
import StackContainer from "@/components/container/stack-container";
import FormRadioField from "@/components/form/form-radio-field";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";
import OrganizationTypeUtil from "@/entities/util/organization-type.util";

export interface OrganizationFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function OrganizationForm<Entity>({ form, onSubmit }: OrganizationFormProps<Entity>) {
    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    return (
        <StackContainer spacing={4}>
            <FormTextField form={form} label="Name" property="name" />

            <FormTextField form={form} label="Description" property="description" />

            <FormRadioField
                form={form}
                label="Type"
                property="type"
                options={OrganizationTypeUtil.getMetadata().map(({ label, type }) => ({ label: label, value: type }))}
            />

            <SubmitButton onSubmit={handleSubmit}>Submit</SubmitButton>
        </StackContainer>
    );
}

export default OrganizationForm;
