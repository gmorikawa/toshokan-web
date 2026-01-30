import { useNavigator } from "@shared/router/hooks/navigator";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { AddIcon } from "@shared/icons";

import { EmptyList } from "@/layout/empty-list";

import { useAlert } from "@components/feedback/alert/controller";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { ResearchPaper } from "@features/research-paper/types/research-paper";
import { useResearchPaperService } from "@features/research-paper/hooks/research-paper-service";
import { useResearchPaperSearch } from "@features/research-paper/hooks/research-paper-search";
import { RestrictedContent } from "@features/auth/components/restricted-content";
import { ResearchPaperTable } from "@features/research-paper/components/research-paper-table";

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

    // const handleSearch = (query: string): void => {
    //     researchPapers.search(query);
    // };

    const handlePageChange = (page: number): void => {
        researchPapers.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Research Paper"
                actionSlot={
                    <BoxContainer>
                        <RestrictedContent allowedRoles={["ADMIN", "LIBRARIAN"]}>
                            <ActionButton
                                variant="text"
                                onClick={handleCreate}
                                leftIcon={<AddIcon />}
                            >
                                New
                            </ActionButton>
                        </RestrictedContent>
                    </BoxContainer>
                }
            />

            <ApplicationContent>
                {/* <DocumentSearchField
                    query={researchPapers.query}
                    onSearch={handleSearch}
                /> */}

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
            </ApplicationContent>
        </ApplicationPage>
    );
}
