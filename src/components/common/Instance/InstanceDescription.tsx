// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Spinner
} from '@chakra-ui/react'
import { useTenantContext } from '../../../context/tenantContext'
import { ODSInstance } from '../../../core/ODSInstance.types'
import ODSInstanceEdFiVersion from '../ODS/ODSInstaceEdFiVersion'
import ODSInstanceEdFiStatus from '../ODS/ODSInstanceEdFiStatus'
import ODSInstanceDataModelsLabel from '../ODS/ODSInstanceTSDSVersion'
import InstanceDescriptionField from './InstanceDescriptionField'

interface InstanceDescriptionProps {
    instance: ODSInstance
}

const InstanceDescription = ({ instance }: InstanceDescriptionProps) => {
  
  const { edFiStatus, edfiMetadata, metaDataLoading, selectedTenant } = useTenantContext()

  return (
    <Flex>
      <Flex flexDir='column'>
        <InstanceDescriptionField
          content={selectedTenant?.document.edfiApiDiscoveryUrl ?? ''}
          title='Ed-Fi Base URL'
        />

        <InstanceDescriptionField
          content={instance.name}
          title='Instance Name'
        />
        
        <InstanceDescriptionField
          content={instance.instanceType}
          title='Instance Type'
        />
        
      
        {metaDataLoading ? <Spinner /> : <Flex
          flexDir="column"
          mt={5}
        >
          <InstanceDescriptionField
            content={<ODSInstanceEdFiVersion version={edfiMetadata?.version} />}
            title='Ed-Fi Version'
          />

          <InstanceDescriptionField
            content={<ODSInstanceDataModelsLabel dataModels={edfiMetadata?.dataModels} />}
            title="Ed-Fi Data Models"
          />

          <InstanceDescriptionField 
            content={<ODSInstanceEdFiStatus status={edFiStatus} />}
            title="Ed-Fi Status"
          />
        </Flex>}
      </Flex>
    </Flex>
  )
}

export default InstanceDescription