import {
  Flex, Text
} from '@chakra-ui/react'
import VerifyDomainTable from './VerifyDomainTable'

const VerifyDomainTabContentAddDNSStep = () => {
  return (
    <>
      <Flex
        bg='gray.100'
        flexDir='column'
        padding='8px 16px'
        w='750px'
      >
        <Text
          borderRadius='4px'
          display='flex'
          flexDir='column'
          fontFamily='Poppins'
          fontSize='18px'
          fontWeight='700'
          size='md'
        >
          Step 2: Copy the TXT Record Below and Add it to Your DNS
        </Text>

        <Text
          fontFamily='Poppins'
          fontSize='16px'
          fontWeight='400'
        >   
          (You may need to contact your ESC Admin for this.)
        </Text>
      </Flex>

      <Flex mt='8px'>
        <VerifyDomainTable />
      </Flex>
    </>
  )
}

export default VerifyDomainTabContentAddDNSStep