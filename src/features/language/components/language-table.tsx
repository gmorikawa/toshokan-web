import type { Language } from "@features/language/types/language";
import type { Pagination } from "@shared/search/types/pagination";

import { UpdateButton } from "@layout/button/update";
import { DeleteButton } from "@layout/button/delete";

import DataTable from "@components/table/data-table";
import FlexContainer from "@components/container/flex-container";
import PaginationControl from "@components/pagination/pagination-control";
import StackContainer from "@components/container/stack-container";

export interface LanguageTableProps {
    data: Language[];
    pagination: Pagination;

    onUpdate?(entity: Language): void;
    onRemove?(entity: Language): void;
    onPageChange?(page: number): void;
}

export function LanguageTable({ data, pagination, onUpdate, onRemove, onPageChange }: LanguageTableProps) {
    function handleUpdate(entity: Language): void {
        (onUpdate) && (onUpdate(entity));
    }
    
    function handleRemove(entity: Language): void {
        (onRemove) && (onRemove(entity));
    }

    function handlePageChange(page: number): void {
        (onPageChange) && (onPageChange(page));
    }

    return (
        <StackContainer spacing={4}>
            <PaginationControl
                count={pagination.count}
                pageSize={pagination.size}
                page={pagination.page}
                onPageChange={handlePageChange}
            />

            <DataTable
                data={data}
                columns={[
                    {
                        width: "150px",
                        header: "Actions",
                        accessor: (language: Language) => (
                            <FlexContainer>
                                <UpdateButton onClick={() => handleUpdate(language)} />
                                <DeleteButton onClick={() => handleRemove(language)} />
                            </FlexContainer>
                        )
                    },
                    { header: "Name", accessor: (language: Language) => language.name }
                ]}>

            </DataTable>
        </StackContainer>
    );
}

export default LanguageTable;
