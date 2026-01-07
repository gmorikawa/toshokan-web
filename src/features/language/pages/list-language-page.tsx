import { useNavigator } from "@shared/router/hooks/navigator";

import type { Language } from "@features/language/types/language";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useListLanguages } from "@features/language/hooks/use-list-languages";
import { LanguageTable } from "@features/language/components/language-table";

import { useAlert } from "@components/feedback/use-alert";
import { useService } from "@/services/use-service";
import { LanguageService } from "@/services/language-service";

import { ApplicationPage } from "@/layout/page";
import { ApplicationHeader } from "@/layout/header";
import { ApplicationContent } from "@/layout/content";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import { AddIcon } from "@/common/icons";
import { EmptyList } from "@/common/empty-list";
import { ListSkeleton } from "@/common/list-skeleton";
import { ListError } from "@/common/list-error";
import { LoadingBoundary } from "@/common/loading-boundary";


export function ListLanguagePage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const languages = useListLanguages();
    const alert = useAlert();
    const navigate = useNavigator();
    const service = useService<LanguageService>(LanguageService, { includeAuthorization: true });

    const handleCreate = (): void => {
        navigate.to("/app/language/form");
    };

    const handleUpdate = (entity: Language): void => {
        navigate.to(`/app/language/form/${entity.id}`);
    };

    const handleRemove = (entity: Language): void => {
        service.remove(entity)
            .then(() => {
                languages.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        languages.pagination.update(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Language"
                actionSlot={
                    <BoxContainer>
                        <ActionButton variant="text" onClick={handleCreate} leftIcon={<AddIcon />}>New</ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                <LoadingBoundary.Root loader={languages.loader}>
                    <LoadingBoundary.LoadingState>
                        <ListSkeleton />
                    </LoadingBoundary.LoadingState>

                    <LoadingBoundary.SuccessState>
                        {(languages.data.length > 0) && (
                            <LanguageTable
                                data={languages.data}
                                pagination={languages.pagination}
                                onUpdate={handleUpdate}
                                onRemove={handleRemove}
                                onPageChange={handlePageChange}
                            />
                        )}

                        {(languages.data?.length === 0) && (
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

export default ListLanguagePage;
