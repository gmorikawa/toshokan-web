import type { ResearchPaper } from "@/features/document/research-paper/types/research-paper";

import useAlert from "@/components/feedback/use-alert";
import useRouter from "@/hooks/router/use-router";
import useService from "@/services/use-service";
import ResearchPaperService from "@/services/research-paper-service";

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

import useResearchPaperSearch from "@/features/document/research-paper/hooks/use-research-paper-search";
import ResearchPaperTable from "@/features/document/research-paper/components/research-paper-table";
import RestrictedContent from "@/features/auth/components/restricted-content";
import DocumentSearchField from "@/features/document/components/document-search-field";

export function ListResearchPaperPage() {
    const researchPapers = useResearchPaperSearch();
    const alert = useAlert();
    const router = useRouter();
    const service = useService<ResearchPaperService>(ResearchPaperService, { includeAuthorization: true });

    const handleCreate = (): void => {
        router.navigateTo("/app/research-paper/form");
    };

    const handleUpdate = (entity: ResearchPaper): void => {
        router.navigateTo(`/app/research-paper/form/${entity.id}`);
    };

    const handleDetail = (entity: ResearchPaper): void => {
        router.navigateTo(`/app/research-paper/details/${entity.id}`);
    };

    const handleRemove = (entity: ResearchPaper): void => {
        service.remove(entity)
            .then(() => {
                researchPapers.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handleSearch = (query: string): void => {
        researchPapers.search(query);
    };

    const handlePageChange = (page: number): void => {
        researchPapers.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Research Paper"
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
                    query={researchPapers.query}
                    onSearch={handleSearch}
                />

                <LoadingBoundary.Root loader={researchPapers.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(researchPapers.data.length > 0) && (
                            <ResearchPaperTable
                                data={researchPapers.data}
                                pagination={researchPapers.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onDetail={handleDetail}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(researchPapers?.data?.length === 0) && (
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

export default ListResearchPaperPage;
