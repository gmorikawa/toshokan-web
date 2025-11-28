import type { Whitepaper } from "@/entities/models/whitepaper";

import useAlert from "@/hooks/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import WhitepaperService from "@/services/whitepaper-service";

import ApplicationPage from "@/components/layout/page";
import ApplicationHeader from "@/components/layout/header";
import ApplicationContent from "@/components/layout/content";
import ActionButton from "@/components/button/action-button";
import BoxContainer from "@/components/container/box-container";

import { AddIcon } from "@/fragments/icons";
import EmptyList from "@/fragments/empty-list";
import ListSkeleton from "@/fragments/list-skeleton";
import ListError from "@/fragments/list-error";
import LoadingBoundary from "@/fragments/loading-boundary";
import useListWhitepapers from "@/features/document/whitepaper/hooks/use-list-whitepapers";
import WhitepaperTable from "@/features/document/whitepaper/components/whitepaper-table";
import { RestrictedContent } from "@/features/auth/components/restricted-content";

export function ListWhitepaperPage() {
    const list = useListWhitepapers();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<WhitepaperService>(WhitepaperService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/whitepaper/form");
    };

    const handleUpdate = (entity: Whitepaper): void => {
        router.navigateTo(`/app/whitepaper/form/${entity.id}`);
    };

    const handleRemove = (entity: Whitepaper): void => {
        service.remove(entity)
            .then(() => {
                list.reload();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
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
                <LoadingBoundary.Root loader={list}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(list.data.length > 0) && (
                            <WhitepaperTable
                                data={list.data}
                                pagination={list.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={(page: number) => {
                                    list.pagination.setPage(page);
                                    list.reload();
                                }}
                            />
                        )}

                        <EmptyList shouldRender={list.data?.length === 0} />
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
