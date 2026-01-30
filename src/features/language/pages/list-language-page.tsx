import { useNavigator } from "@shared/router/hooks/navigator";
import { AddIcon } from "@shared/icons";

import { useAlert } from "@components/feedback/alert/controller";
import { ApplicationPage } from "@shared/application/components/application-page";
import { ApplicationHeader } from "@shared/application/components/application-header";
import { ApplicationContent } from "@shared/application/components/application-content";
import { EmptyList } from "@/layout/empty-list";
import { ActionButton } from "@components/button/action-button";
import { BoxContainer } from "@components/container/box-container";

import type { Language } from "@features/language/types/language";
import { useAuthorization } from "@features/auth/hooks/authorization";
import { useLanguageService } from "@features/language/hooks/language-service";
import { useLanguageSearch } from "@features/language/hooks/language-search";
import { LanguageTable } from "@features/language/components/language-table";

export function ListLanguagePage() {
    const authorization = useAuthorization("ADMIN", "LIBRARIAN");

    const alert = useAlert();
    const navigate = useNavigator();
    const service = useLanguageService();
    const languageSearch = useLanguageSearch();

    const handleCreate = (): void => {
        navigate.to("/app/language/form");
    };

    const handleUpdate = (entity: Language): void => {
        navigate.to(`/app/language/form/${entity.id}`);
    };

    const handleRemove = (entity: Language): void => {
        service.delete(entity)
            .then(() => {
                languageSearch.refresh();
            })
            .catch((error: Error) => {
                alert.showErrorMessage(error);
            });
    };

    const handlePageChange = (page: number): void => {
        languageSearch.changePage(page);
    };

    return (
        <ApplicationPage>
            <ApplicationHeader
                title="Language"
                actionSlot={
                    <BoxContainer>
                        <ActionButton
                            variant="text"
                            onClick={handleCreate}
                            leftIcon={<AddIcon />}
                        >
                            New
                        </ActionButton>
                    </BoxContainer>
                }
            />

            <ApplicationContent authorization={authorization}>
                {(languageSearch.data.length > 0) && (
                    <LanguageTable
                        data={languageSearch.data}
                        pagination={languageSearch.pagination}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        onPageChange={handlePageChange}
                    />
                )}

                {(languageSearch.data.length === 0) && (
                    <EmptyList />
                )}
            </ApplicationContent>
        </ApplicationPage>
    );
}
