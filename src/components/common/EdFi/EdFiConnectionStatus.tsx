// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex, Text 
} from '@chakra-ui/react'
import { EdFiConnectionVerificationStatus } from '../../../hooks/edfi/useEdFiConnectionForm.types'

interface EdFiConnectionStatusProps {
    status: EdFiConnectionVerificationStatus | 'Loading'
}

type CustomConnectionVerificationStatus = EdFiConnectionVerificationStatus | 'Loading'

const selectBorderColor = (status: CustomConnectionVerificationStatus) => {
  if (status === 'Connected') {
    return 'green.400'
  }

  if (status === 'Unknown' || status === 'Loading') {
    return 'gray.300'
  }
    
  return 'orange.400'
}

const selectTextColor = (status: CustomConnectionVerificationStatus) => {
  if (status === 'Connected') {
    return 'green.800'
  }

  if (status === 'Unknown' || status === 'Loading') {
    return 'gray.800'
  }
        
  return 'orange.600'
}

const selectSize = (status: CustomConnectionVerificationStatus) => {
  return '150px'
}

const EdFiConnectionStatus = ({ status }: EdFiConnectionStatusProps) => {
  return (
    <Flex 
      alignItems='center'
      border='1px'
      borderColor={selectBorderColor(status)}
      borderRadius='4px'
      h='32px'
      justifyContent='center'
      w={selectSize(status)}
    >
      <Text
        color={selectTextColor(status)}
        fontFamily='Archivo Narrow'
        fontWeight='400'
        size='md'
      >
        {status}
      </Text>
    </Flex>
  )
}

export default EdFiConnectionStatus