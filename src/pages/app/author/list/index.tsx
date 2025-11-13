import { useEffect, useState } from "react";
import type { Author } from "@/entities/models/author";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import AuthorService from "@/services/author-service";

import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import TextButton from "@/components/button/text-button";

function AuthorListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<AuthorService>(AuthorService, { includeAuthorization: true });
    const [list, setList] = useState<Author[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/author/form");
    };

    const handleUpdate = (entity: Author): void => {
        router.navigateTo(`/app/author/form/${entity.id}`);
    };

    const handleRemove = (entity: Author): void => {
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
        <BoxContainer>
            <TextButton onClick={handleCreate}>
                New
            </TextButton>

            <DataTable
                data={list}
                columns={[
                    {
                        header: "Actions",
                        accessor: (row: Author) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Full name", accessor: (row: any) => row.fullname }
                ]}>

            </DataTable>
        </BoxContainer>
    );
}

export default AuthorListPage;
