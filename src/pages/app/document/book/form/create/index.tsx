import type { NewBook } from "@/entities/models/book";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import useForm from "@/components/form/use-form";
import BoxContainer from "@/components/container/box-container";
import ActionButton from "@/components/button/action-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import BookForm from "../form";

import { BackIcon } from "@/fragments/icons";
import { newBookValidator } from "@/entities/validators/book/new-book.validator";

export function CreateBookFormPage() {
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

            <ApplicationContent>
                <BookForm form={form} onSubmit={handleSubmit} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CreateBookFormPage;
