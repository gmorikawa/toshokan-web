import { useEffect, useState } from "react";
import type { Book } from "@/entities/models/book";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import BookService from "@/services/book-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import PaginationControl from "@/components/pagination/pagination-control";
import StackContainer from "@/components/container/stack-container";

import { AddIcon } from "@/fragments/icons";
import type { Pagination } from "@/entities/query";
import usePagination from "@/components/pagination/use-pagination";

export function ListBookPage() {
    const alert = useAlert();
    const router = useRouter();
    const pagination = usePagination();
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
                loadList(pagination);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const loadList = (pagination?: Pagination) => {
        service.getAll({ pagination })
            .then((result) => {
                setList(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const loadCount = () => {
        service.countAll()
            .then((result) => {
                pagination.setCount(result);
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
                pagination.setCount(0);
            });
    };

    useEffect(() => {
        loadList(pagination);
        loadCount();
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
                <StackContainer spacing={4}>
                    <PaginationControl
                        count={pagination.count}
                        pageSize={pagination.size}
                        page={pagination.page}
                        onPageChange={(page) => {
                            pagination.setPage(page);
                            loadList({ page: page, size: pagination.size });
                        }}
                    />
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
                </StackContainer>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListBookPage;
