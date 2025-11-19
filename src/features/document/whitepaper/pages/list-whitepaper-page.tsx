import { useEffect, useState } from "react";
import type { Whitepaper } from "@/entities/models/whitepaper";
import type { Pagination } from "@/entities/query";

import useAlert from "@/hooks/feedback/use-alert";
import usePagination from "@/components/pagination/use-pagination";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import PaginationControl from "@/components/pagination/pagination-control";
import OutlineButton from "@/components/button/outline-button";
import StackContainer from "@/components/container/stack-container";

import { AddIcon } from "@/fragments/icons";

export function ListWhitepaperPage() {
    const alert = useAlert();
    const router = useRouter();
    const pagination = usePagination();
    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });
    const [list, setList] = useState<Whitepaper[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/whitepaper/form");
    };

    const handleUpdate = (entity: Whitepaper): void => {
        router.navigateTo(`/app/whitepaper/form/${entity.id}`);
    };

    const handleRemove = (entity: Whitepaper): void => {
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
                title="Whitepaper"
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
                            accessor: (row: Whitepaper) => (
                                <FlexContainer spacing="2">
                                    <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                                </FlexContainer>
                            )
                        },
                        { header: "Title", accessor: (row: any) => row.title }
                    ]}>

                </DataTable>
                </StackContainer>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListWhitepaperPage;
