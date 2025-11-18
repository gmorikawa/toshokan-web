import type { NewAuthor } from "@/entities/models/author";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import AuthorForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { newAuthorValidator } from "@/entities/validators/author/new-author.validator";

export function CreateAuthorFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });

    const form = useForm<NewAuthor>({
        default: {
            fullname: "",
            biography: ""
        },
        validator: newAuthorValidator,
        onSubmit: async (entity: NewAuthor) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/author/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });


    function handleBack(): void {
        router.navigateTo("/app/author/list");
    }


    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Author"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <AuthorForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateAuthorFormPage;
