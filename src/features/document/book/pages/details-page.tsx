import useRouter from "@/hooks/router/use-router";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { BackIcon } from "@/common/icons";
import { useBook } from "../hooks/use-book";
import useParams from "@/hooks/router/use-params";
import { BookInfo } from "../components/book-info";
import { useBookFiles } from "../hooks/use-book-files";

type ParamsWithId = {
    id: string;
}

export function BookDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { book } = useBook(id);
    const { files } = useBookFiles(book);

    const router = useRouter();

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
                {(book) && <BookInfo book={book} files={files} />}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default BookDetailsPage;
