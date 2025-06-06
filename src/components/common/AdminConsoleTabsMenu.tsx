// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  Flex,
  Tab, TabIndicator,
  TabList,
  TabPanel, TabPanels,
  Tabs
} from '@chakra-ui/react'
import { useState } from 'react'
import TabContentWrapper from './TabContentWrapper'

interface AdminConsoleTabsMenuProps {
    tabsList: string[]
    children: JSX.Element[]
    actionControl?: JSX.Element
    initialIndex?: number
    contentMt?: string 
    includeWrapper?: boolean
}

const AdminConsoleTabsMenu = ({ children, tabsList, initialIndex, contentMt, includeWrapper, actionControl }: AdminConsoleTabsMenuProps) => {
  const [ index, setIndex ] = useState(initialIndex? initialIndex : 0)

  return (
    <Tabs 
      isLazy
      index={index}
      position="relative"
      variant="unstyled" 
      w='full' 
      onChange={(nindex) => setIndex(nindex)}
    >
      <Flex
        justifyContent='space-between'
        w='full'
      >
        <Flex w='full'>
          <TabList>
            {tabsList.map(tab => 
              <Tab 
                key={tab}
                _notFirst={{ ml: '32px' }}
                _selected={{ color: 'blue.600' }}
                fontFamily='Poppins'
                fontWeight='bold'
                padding='0'
              >{tab}
              </Tab>)}
          </TabList>
        </Flex>

        { actionControl }
      </Flex>

      <TabIndicator
        bg="blue.600"
        borderRadius="1px"
        height="2px"
        mt="5px"
      />

      <TabPanels padding='0'>
        {children.map((child, index) => 
          <TabPanel
            key={index}
            mt={contentMt? contentMt : '45px'}
            padding='0'
            w='full'
          >
            {includeWrapper === false? 
              child  : 
              <TabContentWrapper>
                {child}
              </TabContentWrapper> }
          </TabPanel>)}
      </TabPanels>
    </Tabs>
  )
}

export default AdminConsoleTabsMenu