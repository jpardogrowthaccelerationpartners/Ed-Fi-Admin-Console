// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Text } from '@chakra-ui/react'
import { ExtendedODSInstance } from '../../../core/ODSInstance.types'
import useOdsInstanceHostingType from '../../../hooks/odsInstances/useOdsInstanceHostingType'

interface ODSInstanceHostingTypeProps {
    instance: ExtendedODSInstance | null
}

const ODSInstanceHostingType = ({ instance }: ODSInstanceHostingTypeProps) => {
  const {
    getHostingType
  } = useOdsInstanceHostingType()

  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      { getHostingType(instance) }
    </Text>
  )
}

export default ODSInstanceHostingType