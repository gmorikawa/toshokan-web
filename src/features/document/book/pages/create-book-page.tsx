import type { NewBook } from "@/features/document/book/types/book";
import { newBookValidator } from "@/features/document/book/validators/new-book.validator";

import useAlert from "@/components/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import BookForm from "@/features/document/book/components/book-form";

import { BackIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

export function CreateBookPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();

    const service = useService<BookService>(BookService, { includeAuthorization: true });

    const form = useForm<NewBook>({
        default: {
            type: "FICTION",
            title: "",
            subtitle: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            category: null,
            publisher: null,
        },
        validator: newBookValidator,
        onSubmit: async (entity: NewBook) => {
            if (!form.isValid()) return;
            try {
                await service.create(entity);
                router.navigateTo("/app/book/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        router.navigateTo("/app/book/list");
    }

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Book"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleBack} leftIcon={<BackIcon />}>Back</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <BookForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateBookPage;
