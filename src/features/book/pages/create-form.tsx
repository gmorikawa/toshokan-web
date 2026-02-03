import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Book, NewBook } from "@features/book/types/book";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useBookService } from "@features/book/hooks/book-service";
import { useBookFileUpload } from "@features/book/hooks/book-file-upload";
import { newBookValidator } from "@features/book/utils/validators";
import { BookForm } from "@features/book/components/book-form";

export function BookCreateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useBookService();
    const uploader = useBookFileUpload();
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
            publishingYear: null,
            edition: "",
        },
        validator: newBookValidator,
        onSubmit: async (entity: NewBook) => {
            if (!form.isValid()) return;

            service.create(entity)
                .then((savedBook: Book) => {
                    return uploader.upload(savedBook);
                })
                .then(() => {
                    navigate.to("/app/book/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
        }
    });

    const handleSubmit = (): void => {
        form.submit();
    };

    const handleBack = (): void => {
        navigate.to("/app/book/list");
    };

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
                <BookForm
                    form={form}
                    uploader={uploader}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
