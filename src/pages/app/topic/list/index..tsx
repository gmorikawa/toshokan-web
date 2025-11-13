import { useEffect, useState } from "react";
import type { Topic } from "@/entities/topic";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import TopicService from "@/services/topic-service";

import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import TextButton from "@/components/button/text-button";

function TopicListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<TopicService>(TopicService, { includeAuthorization: true });
    const [list, setList] = useState<Topic[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/topic/form");
    };

    const handleUpdate = (entity: Topic): void => {
        router.navigateTo(`/app/topic/form/${entity.id}`);
    };

    const handleRemove = (entity: Topic): void => {
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
                        accessor: (row: Topic) => (
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

export default TopicListPage;
