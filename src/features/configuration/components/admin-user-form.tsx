import type { NewUser } from "@/features/user/types/user";

import { type Form } from "@/components/form/use-form";

import BoxContainer from "@/components/container/box-container";
import FormPasswordField from "@/components/form/form-password-field";
import FormTextField from "@/components/form/form-text-field";
import Heading from "@/components/typography/header-typography";
import Paragraph from "@/components/typography/paragraph";
import SubmitButton from "@/components/button/submit-button";

export interface AdminUserFormProps {
    form: Form<NewUser>;
}

export function AdminUserForm({ form }: AdminUserFormProps) {
    return (
        <>
            <BoxContainer>
                <Heading>
                    First Access - Create Admin User
                </Heading>

                <Paragraph size="sm">
                    Please create the initial admin user to access the application.
                </Paragraph>
            </BoxContainer>

            <FormTextField form={form} label="Full Name" property="fullname" required />

            <FormTextField form={form} label="Username" property="username" required />

            <FormPasswordField form={form} label="Password" property="password" required />

            <FormTextField form={form} label="Email" property="email" />

            <SubmitButton onSubmit={() => form.submit()}>
                Submit
            </SubmitButton>
        </>
    );
}

export default AdminUserForm;