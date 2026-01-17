import { Table } from "@chakra-ui/react"

type TextNode = string;
type ComponentNode = React.ReactNode;
type Node = ComponentNode | TextNode;

interface TableColumn<Row> {
    width?: string | number;
    header: string;
    accessor(row: Row): Node;
}

interface DataTableProps<Row> {
    data: Row[];
    columns: TableColumn<Row>[];
}

function DataTable<Row>({ data = [], columns = [] }: DataTableProps<Row>) {
    return (
        <Table.Root variant="outline">
            <Table.Header>
                <Table.Row>
                    {columns.map((column: TableColumn<Row>, index: number) => (
                        <Table.ColumnHeader key={index} fontWeight="bold" width={column.width}>
                            {column.header}
                        </Table.ColumnHeader>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row: Row, rowIndex: number) => (
                    <Table.Row key={rowIndex}>
                        {columns.map((column: TableColumn<Row>, colIndex: number) => (
                            <Table.Cell key={colIndex}>
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
