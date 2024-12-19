import {
  Flex, FormControl,
  Spinner
} from '@chakra-ui/react'
import {
  CompleteFormErrorMessage, CustomFormLabel, CustomInput
} from '@edfi/admin-console-shared-sdk'
import { EdfiVendor } from '../../../core/Edfi/EdfiVendors'
import usePartnerForm from '../../../hooks/adminActions/edfi/usePartnerForm'
import EdFiModalForm from './EdFiModalForm'

interface PartnerFormProps {
    schoolYear: number 
    mode: 'add' | 'edit'
    onFinishSave: () => void
    initialData: EdfiVendor | undefined
}

const PartnerForm = ({ initialData, schoolYear, mode, onFinishSave }: PartnerFormProps) => {
  const { 
    partnerData, 
    isSaving,
    setIsSaving,
    errors,
    hasTriedSubmit,
    onChangeParnerData,
    onSave 
  } = usePartnerForm({ 
    mode,
    schoolYear,
    onFinishSave,
    initialData
  })

  function onPClose() {
    setIsSaving(true)
    onFinishSave()
  }

  function onPSave() {
    onSave()
    onFinishSave()
  }

  return (isSaving ? <Spinner /> : <EdFiModalForm
    content={<Flex w='full'>
      <Flex
        flexDir='column'
        w='full'
      >
        { Object.keys(errors).length > 0 && hasTriedSubmit && <CompleteFormErrorMessage /> }

        <Flex
          flexDir='column'
          w='full'
        >
          <FormControl>
            <CustomFormLabel
              htmlFor="partnerName" 
              text="Vendor Name"
            />

            <CustomInput 
              error={errors && errors['partnerName'] && errors['partnerName'].message}
              id="partnerName"
              value={partnerData.company}
              onChange={onChangeParnerData}
            />
          </FormControl>

          <FormControl mt='24px'>
            <CustomFormLabel
              htmlFor="namespacePrefixes" 
              text="Namespace Prefixes"
            />

            <Flex
              flexDir='column'
              w='full'
            >
              <CustomInput 
                error={errors && errors['namespacePrefixes'] && errors['namespacePrefixes'].message}
                id="namespacePrefixes"
                value={partnerData.namespacePrefixes} 
                onChange={onChangeParnerData}
              />
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>}
    actionText="Save"
    headerText={mode === 'add'? 'Add Vendor' : 'Edit Vendor'}
    isSaving={isSaving}
    onClose={onPClose} 
    onSave={onPSave}
  />
  )
}

export default PartnerForm