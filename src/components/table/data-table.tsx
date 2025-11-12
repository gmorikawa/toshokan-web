import { Table } from "@chakra-ui/react"

interface TableColumn {
    header: string;
    accessor<Row, Cell>(row: Row): Cell;
}

interface DataTableProps<Row> {
    data: Row[];
    columns: TableColumn[];
}

function DataTable<Row>({ data = [], columns = [] }: DataTableProps<Row>) {
    return (
        <Table.Root variant="outline">
            <Table.Header>
                <Table.Row>
                    {columns.map((column) => (
                        <Table.ColumnHeader fontWeight="bold">
                            {column.header}
                        </Table.ColumnHeader>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row: Row) => (
                    <Table.Row>
                        {columns.map((column: TableColumn) => (
                            <Table.Cell>
                                {column.accessor(row)}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
            {/* <Table.Footer>
                <Table.Row>
                    <Table.Cell />
                </Table.Row>
            </Table.Footer> */}
        </Table.Root>
    );
}

export { DataTable };
export type { DataTableProps };
export default DataTable;
