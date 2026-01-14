import { useNavigator } from "@shared/router/hooks/navigator";

import type { Whitepaper } from "@features/whitepaper/types/whitepaper";
import { useWhitepaperSearch } from "@features/whitepaper/hooks/whitepaper-search";
import { WhitepaperTable } from "@features/whitepaper/components/whitepaper-table";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { DocumentSearchField } from "@features/document/components/document-search-field";

import { useAlert } from "@components/feedback/use-alert";
import { useWhitepaperService } from "@features/whitepaper/hooks/whitepaper-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { AddIcon } from "@shared/icons";
import { EmptyList } from "@/layout/empty-list";
import { ListSkeleton } from "@/layout/list-skeleton";
import { ListError } from "@/layout/list-error";
import { LoadingBoundary } from "@/layout/loading-boundary";

export function ListWhitepaperPage() {
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

    const handleSearch = (query: string): void => {
        whitepapers.search(query);
    };

    const handlePageChange = (page: number): void => {
        whitepapers.pagination.update(page);
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
                <DocumentSearchField
                    query={whitepapers.query}
                    onSearch={handleSearch}
                />

                <LoadingBoundary.Root loader={whitepapers.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
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
                    </LoadingBoundary.SuccessState>

                    <LoadingBoundary.ErrorState>
                        <ListError />
                    </LoadingBoundary.ErrorState>
                </LoadingBoundary.Root>
            </ApplicationContent>
        </ApplicationPage>
    );
}

export default ListWhitepaperPage;
