import { Flex, Spinner, Text } from "@chakra-ui/react"

interface InstanceLoadingContentProps {
    text?: string
    minH?: string 
}

const InstanceLoadingContent = ({ minH, text }: InstanceLoadingContentProps) => {
    return (
        <Flex 
            flexDir='column'
            alignItems='center' 
            justifyContent='center' 
            h={ minH ?? '200px'}
            w='full'>
                <Spinner 
                    color="blue.600" 
                    size='xl' />
                <Text 
                    fontSize='16px'
                    mt='32px'>
                        { text ?? `Loading Instance Data...` }
                </Text>
        </Flex>
    )
}

export default InstanceLoadingContent