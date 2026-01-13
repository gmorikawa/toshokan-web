import { useNavigator } from "@shared/router/hooks/navigator";

import type { NewBook } from "@features/book/types/book";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { newBookValidator } from "@features/book/utils/validators";
import { BookForm } from "@features/book/components/book-form";

import { useAlert } from "@components/feedback/use-alert";
import { useForm } from "@components/form/use-form";
import { useBookService } from "@features/book/hooks/book-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { BackIcon } from "@/common/icons";

export function CreateBookPage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    function handleSubmit() {
        form.submit();
    }
    const alert = useAlert();
    const navigate = useNavigator();

    const service = useBookService();

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
                navigate.to("/app/book/list");
            } catch (error) {
                alert.showErrorMessage(error as Error);
            }
        }
    });

    function handleBack(): void {
        navigate.to("/app/book/list");
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
