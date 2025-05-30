// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Td, Text
} from '@chakra-ui/react'
import { CustomCheckbox } from '@edfi/admin-console-shared-sdk'
import { ChangeEvent } from 'react'
import { AvailableInstance } from '../../../core/ODSInstance.types'
import ControlTableRow from '../ControlTableRow'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'

interface SelectInstancesTableRowsProps {
    instancesList: AvailableInstance[]
    showChecked: boolean
    onSelectInstance: (e: ChangeEvent<HTMLInputElement>) => void
}

const SelectInstancesTableRows = ({ instancesList, showChecked, onSelectInstance }: SelectInstancesTableRowsProps) => {
  return (
    <>
      {instancesList.map((instance, index) => 
        <ControlTableRow key={index}>
          <Td w={showChecked? 'auto' : '30%'}>
            <Flex>
              {showChecked && <CustomCheckbox
                id={instance.district}
                isChecked={instance.isSelected}
                value={instance.district}
                onCheck={onSelectInstance}
              />}

              <Text
                color='gray.700'
                fontFamily='Poppins'
                fontWeight='400'
                ml={showChecked? '10px' : '0px'}
                size='md'
              >
                {instance.district}
              </Text>
            </Flex>
          </Td>

          <Td w={showChecked? 'auto' : '30%'}>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {instance.instanceYear}
            </Text>
          </Td>

          <Td w={showChecked? 'auto' : '30%'}>
            <Text
              color='gray.700'
              fontFamily='Poppins'
              fontWeight='400'
              size='md'
            >
              {instance.edfiVersion}
            </Text>
          </Td>

          <Td>
            <ODSInstanceEdFiStatus status={instance.edfiStatus} />
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default SelectInstancesTableRows