import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useQuery } from "@shared/router/hooks/query";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon, FileUploadIcon, FormIcon } from "@shared/icons";

import type { TabOption } from "@components/tab/tab-control";
import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";
import { TabContent } from "@components/tab/tab-content";
import { TabControl } from "@components/tab/tab-control";

import type { Book } from "@features/book/types/book";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useBookService } from "@features/book/hooks/book-service";
import { bookValidator } from "@features/book/utils/validators";
import { BookForm } from "@features/book/components/book-form";
import { BookFileUpload } from "@features/book/components/book-file-upload";

type ParamsWithId = {
    id?: string;
}

type QueryWithTab = {
    tab?: BookFormTab;
}

type BookFormTab = "details" | "files";

const bookFormTabOptions: TabOption<BookFormTab>[] = [
    { tab: "details", label: "Details", icon: <FormIcon /> },
    { tab: "files", label: "File Upload", icon: <FileUploadIcon /> }
];

export function UpdateBookFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const { id } = useParams<ParamsWithId>();
    const { tab } = useQuery<QueryWithTab>();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useBookService();
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
            documentFiles: [],
            publishingYear: null,
            edition: "",
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

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/book/list");
    };

    useEffect(() => {
        loadEntity();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Book"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleBack}
                            leftIcon={<BackIcon />}
                        >
                            Back
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <TabControl defaultTab={tab ?? "details"} options={bookFormTabOptions}>
                    <TabContent tab="details">
                        <BookForm
                            form={form}
                            onSubmit={handleSubmit}
                        />
                    </TabContent>

                    <TabContent tab="files">
                        {(form.entity?.id) && <BookFileUpload book={form.entity} />}
                    </TabContent>
                </TabControl>
            </ApplicationContent>
        </ApplicationPage>
    );
}
