import { useEffect } from "react";

import { useParams } from "@shared/router/hooks/params";
import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { BackIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { useForm } from "@components/form/use-form";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Book } from "@features/book/types/book";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useBookService } from "@features/book/hooks/book-service";
import { useBookFileUpload } from "@features/book/hooks/book-file-upload";
import { useBookFiles } from "@features/book/hooks/book-files";
import { bookValidator } from "@features/book/utils/validators";
import { BookForm } from "@features/book/components/book-form";

type ParamsWithId = {
    id: string;
}

export function BookUpdateFormPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const { id } = useParams<ParamsWithId>();
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useBookService();
    const files = useBookFiles(id);
    const uploader = useBookFileUpload();
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
            service.update(entity)
                .then((updatedBook: Book) => {
                    return uploader.upload(updatedBook);
                })
                .then(() => {
                    navigate.to("/app/book/list");
                })
                .catch((error: Error) => {
                    alert.showErrorMessage(error);
                });
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
                <BookForm
                    form={form}
                    files={files}
                    uploader={uploader}
                    onSubmit={handleSubmit}
                />
            </ApplicationContent>
        </ApplicationPage>
    );
}
