import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";
import { useWhitepaperSearch } from "@features/whitepaper/hooks/whitepaper-search";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { WhitepaperTable } from "@features/whitepaper/components/whitepaper-table";

export function WhitepaperListPage() {
    const whitepapers = useWhitepaperSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useWhitepaperService();

    const handleCreate = (): void => {
        navigate.to("/app/whitepaper/form");
    };

    const handleUpdate = (entity: Whitepaper): void => {
        navigate.to(`/app/whitepaper/form/${entity.id}`);
    };

    const handleDetail = (entity: Whitepaper): void => {
        navigate.to(`/app/whitepaper/details/${entity.id}`);
    };

    const handleRemove = (entity: Whitepaper): void => {
        service.delete(entity)
            .then(() => {
                whitepapers.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    // const handleSearch = (query: string): void => {
    //     whitepapers.search(query);
    // };

    const handlePageChange = (page: number): void => {
        whitepapers.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Whitepaper"
                actionSlot={
                    <BoxContainer>
                        <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                            <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                        </RestrictedContent>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {/* <DocumentSearchField
                    query={whitepapers.query}
                    onSearch={handleSearch}
                /> */}

                {(whitepapers.data.length > 0) && (
                    <WhitepaperTable
                        data={whitepapers.data}
                        pagination={whitepapers.pagination}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        onDetail={handleDetail}
                        onPageChange={handlePageChange}
                    />
                )}

                {(whitepapers.data?.length === 0) && (
                    <EmptyList />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}
