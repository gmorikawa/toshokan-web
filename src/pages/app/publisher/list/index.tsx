import { useEffect, useState } from "react";
import type { Publisher } from "@/entities/models/publisher";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import PublisherService from "@/services/publisher-service";

import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import TextButton from "@/components/button/text-button";

function PublisherListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<PublisherService>(PublisherService, { includeAuthorization: true });
    const [list, setList] = useState<Publisher[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/publisher/form");
    };

    const handleUpdate = (entity: Publisher): void => {
        router.navigateTo(`/app/publisher/form/${entity.id}`);
    };

    const handleRemove = (entity: Publisher): void => {
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
                        accessor: (row: Publisher) => (
                            <FlexContainer spacing="2">
                                <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (row: any) => row.name }
                ]}>

            </DataTable>
        </BoxContainer>
    );
}

export default PublisherListPage;
