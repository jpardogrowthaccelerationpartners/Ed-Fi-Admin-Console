import { Flex } from "@chakra-ui/react"
import { TablePagination } from "@edfi/admin-console-shared-sdk"
import useEducationsOrganizations from "../../../hooks/adminActions/ods/useEducationOrganizations"
import useControlTablePagination from "../../../hooks/controlTable/useControlTablePagination"
import useControlTableSorting from "../../../hooks/controlTable/useControlTableSorting"
import ControlTable from "../ControlTable"
import ControlTableHeader from "../ControlTableHeader"
import EducationOrganizationsTableRows from "./EducationOrganizationsTableRows"

const EducationOrganizationsTable = () => {
    const { educationOrganizationsList, isFetchingEducationOrganizations } = useEducationsOrganizations()

    const {
        sortedData,
        sortTextAsc,
        sortTextDesc,
        sortedByField,
        sortingType,
    } = useControlTableSorting({ data: educationOrganizationsList })
    const {
        paginatedItems,
        pageSize,
        currentPage,
        canNextPage,
        canPreviousPage,
        onDecrementPageSize,
        onIncrementPageSize,
        onChangePageSize,
        minPerPage,
        maxPerPage,
        totalPages,
        goToInitialPage,
        goToNextPage,
        goToPreviousPage,
        gotToLastPage
    } = useControlTablePagination({ data: sortedData })

    return (
        <ControlTable 
            headers={[
                <ControlTableHeader headerData={{ text: 'Education Organization ID', fieldName: 'id', showSorting: true, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc, sortingType, sortedByField }} />,
                <ControlTableHeader headerData={{ text: 'Name of Institution', fieldName: 'name', showSorting: false, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc, sortingType, sortedByField }} />,
                <ControlTableHeader headerData={{ text: 'Short Name', fieldName: 'shortName', showSorting: false, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc, sortingType, sortedByField }} />,
                <ControlTableHeader headerData={{ text: 'Ed Org Category', fieldName: 'orgCategory', showSorting: false, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc, sortingType, sortedByField }} />,
                <ControlTableHeader headerData={{ text: 'LEA Category', fieldName: 'leaCategory', showSorting: false, onSortAsc: sortTextAsc, onSortDesc: sortTextDesc, sortingType, sortedByField }} />,
            ]}
            itemsCount={paginatedItems.length}
            thPadding='auto'
            loading={isFetchingEducationOrganizations}
            rows={<EducationOrganizationsTableRows organizationsList={paginatedItems} />}
            pagination={
                <Flex ml='auto' w='auto'>   
                    <TablePagination 
                        currentPage={currentPage}
                        goToInitialPage={goToInitialPage}
                        goToLastPage={gotToLastPage}
                        goToNextPage={goToNextPage}
                        goToPreviousPage={goToPreviousPage}
                        canNextPage={canNextPage}
                        canPreviousPage={canPreviousPage}
                        pageSize={pageSize}
                        onDecrementPageSize={onDecrementPageSize}
                        onIncrementPageSize={onIncrementPageSize}
                        totalPages={totalPages}
                        maxPageSize={maxPerPage}
                        minPageSize={minPerPage}
                        onChangePageSize={onChangePageSize} />
                </Flex>} />
    )
}

export default EducationOrganizationsTable