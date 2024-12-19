import {
  Td, Text
} from '@chakra-ui/react'
import {
  EdFiConnectionFormData, EdFiConnectionVerificationStatus
} from '../../../../hooks/edfi/useEdFiConnectionForm.types'
import ControlTable from '../../ControlTable'
import ControlTableRow from '../../ControlTableRow'
import EdFiConnectionStatus from '../../EdFi/EdFiConnectionStatus'

interface ConnectedEdFiTableProps {
    connectedODS: EdFiConnectionFormData
    verificationStatus: EdFiConnectionVerificationStatus
}

const headers = [
  <Text>Base Url</Text>,
  <Text>Status</Text>,
]

const ConnectedEdFiTable = ({ connectedODS, verificationStatus }: ConnectedEdFiTableProps) => {
  return (
    <ControlTable
      rows={
        <ControlTableRow>
          <Td w='15%'>
            <Text
              color='blue.600'
              fontFamily='Poppins'
              fontWeight='700'
              size='md'
            >
              {connectedODS.baseUrl}
            </Text>
          </Td>

          <Td w='5%'> 
            <EdFiConnectionStatus status={verificationStatus} />
          </Td>
        </ControlTableRow>}
      headers={headers}
      itemsCount={1}
      loading={false}
      thPadding='auto'
    />
  )
}

export default ConnectedEdFiTable