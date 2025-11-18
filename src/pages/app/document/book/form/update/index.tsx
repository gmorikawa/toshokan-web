import type { Book } from "@/entities/models/book";

import { useEffect } from "react";
import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useParams from "@/hooks/router/use-params";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import useForm from "@/components/form/use-form";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";
import BookForm from "../form";

import { BackIcon, FileUploadIcon, FormIcon } from "@/fragments/icons";
import TabControl, { type TabOption } from "@/components/tab/tab-control";
import TabContent from "@/components/tab/tab-content";
import BookFileUpload from "../file";
import { bookValidator } from "@/entities/validators/book/book.validator";

type ParamsWithId = {
    id?: string;
}

type BookFormTab = "details" | "files";

const bookFormTabOptions: TabOption<BookFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];

export function UpdateBookFormPage() {
    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const router = useRouter();
    const { id } = useParams<ParamsWithId>();

    const service = useService<BookService>(BookService, { includeAuthorization: true });

    const form = useForm<Book>({
        default: {
            id: "",
            title: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            category: null,
            publisher: null,
            type: "FICTION",
            documentFiles: []
        },
        validator: bookValidator
    });

    async function loadEntity(): Promise<void> {
        if (id) {
            return service.getById(id)
                .then((entity: Book) => {
                    form.reset(entity);
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    };

    // ...existing code...
    // Only one form declaration should exist, so replace the original with the new config above.
    // Remove the duplicate declaration.

    function handleBack(): void {
        router.navigateTo("/app/book/list");
    }

    useEffect(() => {
        loadEntity();
    }, []);

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
                <TabControl defaultTab="details" options={bookFormTabOptions}>
                    <TabContent tab="details">
                        <BookForm form={form} onSubmit={handleSubmit} />
                    </TabContent>

                    <TabContent tab="files">
                        <BookFileUpload book={form.entity} />
                    </TabContent>
                </TabControl>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateBookFormPage;
