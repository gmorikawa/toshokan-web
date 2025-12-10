import type { Whitepaper } from "@/features/document/whitepaper/types/whitepaper";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import ApplicationPage from "@/layout/page";
import ApplicationHeader from "@/layout/header";
import ApplicationContent from "@/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { AddIcon } from "@/common/icons";
import EmptyList from "@/common/empty-list";
import ListSkeleton from "@/common/list-skeleton";
import ListError from "@/common/list-error";
import LoadingBoundary from "@/common/loading-boundary";

import useWhitepaperSearch from "@/features/document/whitepaper/hooks/use-whitepaper-search";
import WhitepaperTable from "@/features/document/whitepaper/components/whitepaper-table";
import RestrictedContent from "@/features/auth/components/restricted-content";
import DocumentSearchField from "@/features/document/components/document-search-field";

export function ListWhitepaperPage() {
    const whitepapers = useWhitepaperSearch();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/whitepaper/form");
    };

    const handleUpdate = (entity: Whitepaper): void => {
        router.navigateTo(`/app/whitepaper/form/${entity.id}`);
    };

    const handleDetail = (entity: Whitepaper): void => {
        router.navigateTo(`/app/whitepaper/details/${entity.id}`);
    };

    const handleRemove = (entity: Whitepaper): void => {
        service.remove(entity)
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
