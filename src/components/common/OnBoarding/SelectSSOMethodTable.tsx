// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import useSSOProviders from '../../../hooks/adminActions/sso/useSSOProviders'
import useControlTableSorting from '../../../hooks/controlTable/useControlTableSorting'
import ControlTable from '../ControlTable'
import ControlTableHeader from '../ControlTableHeader'
import SSOMethodTableRows from './SSOMethodTableRows'

interface SelectSSOMethodTableProps {
    showSelect?: boolean
}

const SelectSSOMethodTable = ({ showSelect }: SelectSSOMethodTableProps) => {
  const { ssoProviderOptions, isFetchingSSOProviders, onToggleSSOProviderOption } = useSSOProviders()

  const {
    sortedData,
    sortedByField,
    sortingType,
    sortTextAsc,
    sortTextDesc
  } = useControlTableSorting({ data: ssoProviderOptions })

  const showSelectColumn = (index: number) => {
    if (showSelect) {
      return true
    }

    return index === 0 || index === 1
  }

  return (
    <ControlTable
      headers={[
        <ControlTableHeader headerData={{
          text: 'Identity Providers',
          fieldName: 'name',
          showSorting: true,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Consent Status',
          fieldName: 'consentStatus',
          showSorting: false,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />,
        <ControlTableHeader headerData={{
          text: 'Select?',
          fieldName: 'selected',
          showSorting: false,
          sortedByField,
          sortingType,
          onSortAsc: sortTextAsc,
          onSortDesc: sortTextDesc 
        }}
        />
      ].filter((header, index) => showSelectColumn(index))}
      rows={<SSOMethodTableRows 
        showOnlySelected={showSelect? false : true}
        ssoMethodsList={sortedData}
        onToggleSSOMethod={onToggleSSOProviderOption}
      />}
      itemsCount={sortedData.length}
      loading={isFetchingSSOProviders}
      thPadding='auto'
    />
  )
}

export default SelectSSOMethodTable