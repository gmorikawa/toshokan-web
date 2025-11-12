import BoxContainer from "@/components/container/box-container";
import DataTable from "@/components/table/data-table";

function TopicListPage() {

    return (
        <BoxContainer>
            <DataTable
                data={[
                ]}
                columns={[
                    { header: "Name", accessor: (row: any) => row.name },
                ]}>

            </DataTable>
        </BoxContainer>
    );
}

export default TopicListPage;
