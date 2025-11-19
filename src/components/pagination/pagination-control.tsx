import { ButtonGroup, Pagination as ChakraPagination, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export interface PaginationControlProps {
    count: number;
    pageSize: number;
    page: number;
    onPageChange?(page: number): void;
}

export function PaginationControl({ count, pageSize, page, onPageChange }: PaginationControlProps) {
    const totalPages = Math.ceil(count / pageSize);

    function handlePrevClick(): void {
        if (page > 1 && onPageChange) {
            onPageChange(page - 1);
        }
    }

    function handleNextClick(): void {
        if (page < totalPages && onPageChange) {
            onPageChange(page + 1);
        }
    }

    return (
        <ChakraPagination.Root count={count} pageSize={pageSize} page={page}>
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                <ChakraPagination.PrevTrigger asChild>
                    <IconButton onClick={handlePrevClick}>
                        <LuChevronLeft />
                    </IconButton>
                </ChakraPagination.PrevTrigger>
                <ChakraPagination.Items
                    render={(page) => (
                        <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                            {page.value}
                        </IconButton>
                    )}
                />

                <ChakraPagination.NextTrigger asChild >
                    <IconButton onClick={handleNextClick}>
                        <LuChevronRight />
                    </IconButton>
                </ChakraPagination.NextTrigger>
            </ButtonGroup>
        </ChakraPagination.Root>
    );
}

export default PaginationControl;