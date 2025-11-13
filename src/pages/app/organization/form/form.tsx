import SubmitButton from "@/components/button/submit-button";
import BoxContainer from "@/components/container/box-container";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";

export interface OrganizationFormProps<Entity> {
    form: Form<Entity>;
    onSubmit?(entity: Entity): void;
}

export function OrganizationForm<Entity>({ form, onSubmit }: OrganizationFormProps<Entity>) {
    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    return (
        <BoxContainer>
            <FormTextField form={form} label="Name" property="name" />
            <FormTextField form={form} label="Description" property="description" />
            <FormTextField form={form} label="Type" property="type" />

            <SubmitButton onSubmit={handleSubmit}>Submit</SubmitButton>
        </BoxContainer>
    );
}

export default OrganizationForm;
