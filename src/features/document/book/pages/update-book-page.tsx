import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from '@shared/router/hooks/navigator';

import type { Book } from "@/features/document/book/types/book";
import { bookValidator } from "@/features/document/book/validators/book.validator";

import { useEffect } from "react";
import useAlert from "@/components/feedback/use-alert";
import useForm from "@/components/form/use-form";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import TabContent from "@/components/tab/tab-content";
import TabControl, { type TabOption } from "@/components/tab/tab-control";

import BookForm from "@/features/document/book/components/book-form";
import BookFileUpload from "@/features/document/book/components/book-file-upload";
import { BackIcon, FileUploadIcon, FormIcon } from "@/common/icons";
import useAuthorizationFilter from "@/features/auth/hooks/use-authorization-filter";

type ParamsWithId = {
    id?: string;
}

type BookFormTab = "details" | "files";

const bookFormTabOptions: TabOption<BookFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];

export function UpdateBookPage() {
    const authorization = useAuthorizationFilter("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();
    const { id } = useParams<ParamsWithId>();

    const service = useService<BookService>(BookService, { includeAuthorization: true });

    const form = useForm<Book>({
        default: {
            id: "",
            title: "",
            subtitle: "",
            summary: "",
            language: null,
            authors: [],
            topics: [],
            category: null,
            publisher: null,
            type: "FICTION",
            documentFiles: []
        },
        validator: bookValidator,
        onSubmit: async (entity: Book) => {
            if (!form.isValid()) return;
            try {
                await service.update(entity);
                navigate.to("/app/book/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
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

    function handleBack(): void {
        navigate.to("/app/book/list");
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

            <ApplicationContent authorization={authorization}>
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

export default UpdateBookPage;
