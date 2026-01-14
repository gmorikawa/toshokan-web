import { useNavigator } from "@shared/router/hooks/navigator";
import { useParams } from "@shared/router/hooks/params";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@components/button/action-button";
import BoxContainer from "@components/container/box-container";

import { BackIcon } from "@shared/icons";
import { useBook } from "../hooks/book";
import { BookInfo } from "../components/book-info";
import { useBookFiles } from "../hooks/book-files";

type ParamsWithId = {
    id: string;
}

export function BookDetailsPage() {
    const { id } = useParams<ParamsWithId>();
    const { book } = useBook(id);
    const { files } = useBookFiles(book);

    const navigate = useNavigator();

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

            <ApplicationContent>
                {(book) && <BookInfo book={book} files={files} />}
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default BookDetailsPage;
