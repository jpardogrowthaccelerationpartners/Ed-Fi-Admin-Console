// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Td, Text
} from '@chakra-ui/react'
import { VerifiedDomainInfo } from '../../../core/verifyDomain/VerifyDomain.types'
import ControlTableRow from '../ControlTableRow'
import DomainVerificationStatus from './DomainVerificationStatus'

interface VerifiedDomainTableRowsProps {
    verifiedDomains: VerifiedDomainInfo[]
}

const VerifiedDomainTableRows = ({ verifiedDomains }: VerifiedDomainTableRowsProps) => {
  return (
    <>
      {verifiedDomains.map((verifiedDomainInfo, index) => 
        <ControlTableRow key={index}>
          <Td w='50%'>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {verifiedDomainInfo.lea}
            </Text>
          </Td>

          <Td w='50%'>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {verifiedDomainInfo.domain}
            </Text>
          </Td>

          <Td>
            <DomainVerificationStatus status={verifiedDomainInfo.status} />
          </Td>
        </ControlTableRow>)}
    </>
  )
}

export default VerifiedDomainTableRows