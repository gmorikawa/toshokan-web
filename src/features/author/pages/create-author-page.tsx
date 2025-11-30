import type { NewAuthor } from "@/types/models/author";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import AuthorForm from "@/features/author/components/author-form";

import { BackIcon } from "@/common/icons";
import { newAuthorValidator } from "@/types/validators/author/new-author.validator";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function CreateAuthorPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

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

            <ApplicationContent authorization={authorization}>
                <AuthorForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateAuthorPage;
