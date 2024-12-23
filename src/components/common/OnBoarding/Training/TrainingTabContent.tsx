import { Flex, Link, Text } from "@chakra-ui/react"
import OnBoardingTabContentWrapper from "../OnBoardingTabContentWrapper"
import TrainingModuleList from "./TrainingModuleList"

interface TrainingTabContentProps {
    onCompleteStep: (stepIndex: number) => void
}

const TrainingTabContent = ({ onCompleteStep }: TrainingTabContentProps) => {
    return (
        <OnBoardingTabContentWrapper>
            <Text
                fontFamily='Open sans'
                fontWeight='400'
                w='539px'>
                   The following training modules must be completed to continue. This video will give you an introduction to the Ed-Fi ODS and insight into its functionality. Supplementary documents related to this section can be found within the 
                    <Link 
                        href="https://txedexchange.atlassian.net/servicedesk/customer/portal/3/article/7962650"
                        color="blue.500"
                        referrerPolicy="no-referrer"
                        target="_blank" 
                        fontWeight='bold'
                        mx='3px'>
                            general onboarding resources
                    </Link> 
                    in Confluence.
            </Text>
            <Flex flexDir='column' mt='32px' w='full'>
               <TrainingModuleList onCompleteStep={onCompleteStep} />
            </Flex>
        </OnBoardingTabContentWrapper>
    )
}

export default TrainingTabContent