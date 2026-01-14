import { useNavigator } from "@shared/router/hooks/navigator";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperSearch } from "@features/research-paper/hooks/research-paper-search";
import { ResearchPaperTable } from "@features/research-paper/components/research-paper-table";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { DocumentSearchField } from "@features/document/components/document-search-field";

import { useAlert } from "@components/feedback/use-alert";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";

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

export function ListResearchPaperPage() {
    const researchPapers = useResearchPaperSearch();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useResearchPaperService();

    const handleCreate = (): void => {
        navigate.to("/app/research-paper/form");
    };

    const handleUpdate = (entity: ResearchPaper): void => {
        navigate.to(`/app/research-paper/form/${entity.id}`);
    };

    const handleDetail = (entity: ResearchPaper): void => {
        navigate.to(`/app/research-paper/details/${entity.id}`);
    };

    const handleRemove = (entity: ResearchPaper): void => {
        service.delete(entity)
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
