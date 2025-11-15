import { useEffect, useState } from "react";
import type { ResearchPaper } from "@/entities/models/research-paper";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import ApplicationPage from "@/pages/app/page";
import ApplicationHeader from "@/pages/app/header";
import ApplicationContent from "@/pages/app/content";

import { AddIcon } from "@/fragments/icons";

function ResearchPaperListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });
    const [list, setList] = useState<ResearchPaper[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/research-paper/form");
    };

    const handleUpdate = (entity: ResearchPaper): void => {
        router.navigateTo(`/app/research-paper/form/${entity.id}`);
    };

    const handleRemove = (entity: ResearchPaper): void => {
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
                title="Research Paper"
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
                            accessor: (row: ResearchPaper) => (
                                <FlexContainer spacing="2">
                                    <OutlineButton onClick={() => handleUpdate(row)}>Edit</OutlineButton>
                                    <OutlineButton onClick={() => handleRemove(row)}>Delete</OutlineButton>
                                </FlexContainer>
                            )
                        },
                        { header: "Title", accessor: (row: any) => row.title },
                        { header: "Keywords", accessor: (row: any) => row.keywords }
                    ]}>

                </DataTable>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ResearchPaperListPage;
