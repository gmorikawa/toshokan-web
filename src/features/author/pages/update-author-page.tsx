import type { Author } from "@/features/author/types/author";
import { authorValidator } from "@/features/author/validators/author.validator";

import { useEffect } from "react";
import useAlert from "@/components/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useParams from "@/hooks/router/use-params";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import AuthorForm from "@/features/author/components/author-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

export function UpdateAuthorPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });

    const form = useForm<Author>({
        default: {
            id: "",
            fullname: "",
            biography: ""
        },
        validator: authorValidator,
        onSubmit: async (entity: Author) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                router.navigateTo("/app/author/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Author) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    function handleBack(): void {
        router.navigateTo("/app/author/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

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

export default UpdateAuthorPage;
