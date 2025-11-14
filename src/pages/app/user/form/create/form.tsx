import SubmitButton from "@/components/button/submit-button";
import StackContainer from "@/components/container/stack-container";
import FormPasswordField from "@/components/form/form-password-field";
import FormRadioField from "@/components/form/form-radio-field";
import FormTextField from "@/components/form/form-text-field";
import type { Form } from "@/components/form/use-form";
import type { NewUser } from "@/entities/models/user";

export interface CreateUserFormProps {
    form: Form<NewUser>;
    onSubmit?(entity: NewUser): void;
}

export function CreateUserForm({ form, onSubmit }: CreateUserFormProps) {
    function handleSubmit(): void {
        (onSubmit) && (onSubmit(form.entity));
    }

    return (
        <StackContainer spacing={4}>
            <FormTextField form={form} label="Full Name" property="fullname" />

            <FormTextField form={form} label="Username" property="username" />

            <FormPasswordField form={form} label="Password" property="password" />

            <FormTextField form={form} label="Email" property="email" />

            <FormRadioField
                form={form}
                label="Role"
                property="role"
                options={[
                    { label: "Admin", value: "ADMIN" },
                    { label: "Librarian", value: "LIBRARIAN" },
                    { label: "Reader", value: "READER" }
                ]}
            />

            <FormRadioField
                form={form}
                label="Status"
                property="status"
                options={[
                    { label: "Active", value: "ACTIVE" },
                    { label: "Blocked", value: "BLOCKED" },
                ]}
            />

            <SubmitButton onSubmit={handleSubmit}>
                Submit
            </SubmitButton>
        </StackContainer>
    );
}

export default CreateUserForm;
