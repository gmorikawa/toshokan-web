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

import { BackIcon } from "@/fragments/icons";

type ParamsWithId = {
    id?: string;
}

export function UpdateBookFormPage() {
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
            type: "FICTION"
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

    function handleSave(): void {
        service.update(form.entity)
            .then(() => {
                router.navigateTo("/app/book/list");
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    }

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
                <BookForm form={form} onSubmit={handleSave} />
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default UpdateBookFormPage;
