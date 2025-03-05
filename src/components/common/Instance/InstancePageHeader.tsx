// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { Flex } from '@chakra-ui/react'
import routes from '../../../core/routes'
import BackToLink from '../BackToLink'

const InstancePageHeader = () => {
  return (
    <Flex
      flexDir='column'
      w='full'
    >
      <BackToLink 
        text="Back to Tech Console Home"
        url={routes.home.url}
      />
    </Flex>
  )
}

export default InstancePageHeader