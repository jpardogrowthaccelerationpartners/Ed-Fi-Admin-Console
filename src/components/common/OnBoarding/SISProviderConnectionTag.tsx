import {
  Flex, Text 
} from '@chakra-ui/react'
import { SISProviderConnectionState } from '../../../core/sisProviders/SISProviders.types'

const selectBorderColor = (status: SISProviderConnectionState) => {
  if (status === 'Connected') {
    return 'green.400'
  }
    
  return 'orange.400'
}

const selectTextColor = (status: SISProviderConnectionState) => {
  if (status === 'Connected') {
    return 'green.800'
  }
        
  return 'orange.600'
}

const selectSize = (status: SISProviderConnectionState) => {
  if (status === 'Connected') {
    return '93px'
  }

  return '150px'
}

interface SISProviderConnectionTagProps {
    status: SISProviderConnectionState
}

const SISProviderConnectionTag = ({ status }: SISProviderConnectionTagProps) => {
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

export default SISProviderConnectionTag