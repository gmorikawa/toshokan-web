import { useEffect, useState } from "react";
import type { Category } from "@/entities/models/category";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import CategoryService from "@/services/category-service";

import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";

import { AddIcon } from "@/fragments/icons";

function CategoryListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<CategoryService>(CategoryService, { includeAuthorization: true });
    const [list, setList] = useState<Category[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/category/form");
    };

    const handleUpdate = (entity: Category): void => {
        router.navigateTo(`/app/category/form/${entity.id}`);
    };

    const handleRemove = (entity: Category): void => {
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
                title="Category"
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
                            accessor: (row: Category) => (
                                <FlexContainer spacing="2">
                                    <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                                </FlexContainer>
                            )
                        },
                        { header: "Name", accessor: (row: any) => row.name }
                    ]}>

                </DataTable>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default CategoryListPage;
