import { useEffect, useState } from "react";
import type { Language } from "@/entities/models/language";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import LanguageService from "@/services/language-service";

import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";
import FlexContainer from "@/components/container/flex-container";
import OutlineButton from "@/components/button/outline-button";
import TextButton from "@/components/button/text-button";

function LanguageListPage() {
    const alert = useAlert();
    const router = useRouter();
    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });
    const [list, setList] = useState<Language[]>([]);

    const handleCreate = (): void => {
        router.navigateTo("/app/language/form");
    };

    const handleUpdate = (entity: Language): void => {
        router.navigateTo(`/app/language/form/${entity.id}`);
    };

    const handleRemove = (entity: Language): void => {
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
                        accessor: (row: Language) => (
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

export default LanguageListPage;
