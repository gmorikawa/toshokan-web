import { useEffect, useState } from "react";
import type { Book } from "@/entities/models/book";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";

import { AddIcon } from "@/fragments/icons";

function BookListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<BookService>(BookService, { includeAuthorization: true });
    const [list, setList] = useState<Book[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/book/form");
    };

    const handleUpdate = (entity: Book): void => {
        router.navigateTo(`/app/book/form/${entity.id}`);
    };

    const handleRemove = (entity: Book): void => {
        service.remove(entity)
            .then(() => {
                loadList();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const loadList = () => {
        service.getAll()
            .then((result) => {
                setList(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    useEffect(() => {
        loadList();
    }, []);

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Book"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                <DataTable
                    data={list}
                    columns={[
                        {
                            header: "Actions",
                            accessor: (row: Book) => (
                                <FlexContainer spacing="2">
                                    <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                                </FlexContainer>
                            )
                        },
                        { header: "Title", accessor: (row: any) => row.title },
                        { header: "Type", accessor: (row: any) => row.type }
                    ]}>

                </DataTable>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default BookListPage;
