import { Text } from '@chakra-ui/react'

interface ODSInstanceAdminDBStatusProps {
    status: string 
}

const ODSInstanceAdminDBStatus = ({ status }: ODSInstanceAdminDBStatusProps) => {
  return (
    <Text
      fontFamily='Poppins'
      fontWeight='400'
      size='md'
    >
      {status}
    </Text>
  )
}

export default ODSInstanceAdminDBStatus