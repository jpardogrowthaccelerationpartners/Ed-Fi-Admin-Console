// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import {
  ChangeEvent,
  useContext,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AdminConsoleConfig, adminConsoleContext
} from '../../context/adminConsoleContext'
import { ODSInstance } from '../../core/ODSInstance.types'
import { OnBoardingStepStatus } from '../../core/onBoardingWizard/onBoardingWizard.types'
import useOdsInstanceYear from '../odsInstances/useOdsInstanceYear'
import useOnboardingWizardStepsData from '../useOnBoardingWizardStepsData'
import useDebugSetupWizardActions from './useDebugSetupWizardActions'

interface UseDebugSetupWizardProps {
    instance: ODSInstance | null
    isDebug: boolean 
}

const isDebugMode = (debugValue: boolean, config: AdminConsoleConfig | null) => {
  if (config) {
    if (config.allowDebug && debugValue) {
      return true
    }
  }

  return false
}

const useDebugSetupWizard = ({ instance, isDebug }: UseDebugSetupWizardProps) => {
  const adminConfig = useContext(adminConsoleContext)
  const navigate = useNavigate()
  const { getInstanceYear } = useOdsInstanceYear()
  const { handleUpdateStep, handleAddStep } = useDebugSetupWizardActions({ instance })
  const [ creatingStep, setCreatingStep ] = useState(false)
  const [ updatingStep, setUpdatingStep ] = useState(false)
  const [ updatingAllSteps, setUpdatingAllSteps ] = useState(false)
  const [ currentResetStep, setCurrentResetStep ] = useState(1)
  const [ showTestingButtons, setShowTestingButtons ] = useState(isDebugMode(isDebug, adminConfig))
  const [ selectedStep, setSelectedStep ] = useState<number>(1)
  const [ selectedStepStatus, setSelectedStepStatus ] = useState<OnBoardingStepStatus>('Pending')
  const [ currentUpdateStep, setCurrentUpdateStep ] = useState(1)
  const { onboardingStepsData } = useOnboardingWizardStepsData()
  const stepNumber = onboardingStepsData.stepsData.length
  const stepStatus: OnBoardingStepStatus = 'Pending'
  const description = onboardingStepsData.tabsData[stepNumber - 1].contentName

  const handleUpdateSelectedStep = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === 'selectStep') {
      setSelectedStep(parseInt(e.target.value))
    }

    if (e.target.id === 'selectStatus') {
      setSelectedStepStatus(e.target.value as OnBoardingStepStatus)
    }
  }
    
  const handleUpdateOBStep = async () => {
    console.log('click update step...')

    if (selectedStep > 1) {
      await handleUpdateOBStepsFromTo()
    } else {
      setUpdatingStep(true)
      const result = await handleUpdateStep({
        number: selectedStep,
        status: selectedStepStatus 
      })
    
      console.log(result)
    
      setUpdatingStep(false)
    }
        
    // navigate(`${routes.setUpWizard.url}/${getInstanceYear(instance)}`)
    window.location.reload()
  }

  const handleUpdateOBStepsFromTo = async () => {
    console.log('update steps from', 1, selectedStep)

    setUpdatingStep(true)

    for (let step = 1; step <= selectedStep; step++) {
      console.log('updating step', step, selectedStepStatus)
      setCurrentUpdateStep(step)

      const result = await handleUpdateStep({
        number: step,
        status: selectedStepStatus 
      })
            
      if (result) {
        console.log('updated step', step, selectedStepStatus)
      }
    }

    setUpdatingStep(false)
  }

  const handleResetOBSteps = async () => {
    console.log('reset all onboarding wizard steps...')
    setUpdatingAllSteps(true)

    const status: OnBoardingStepStatus = 'Pending'

    for (let step = 1; step <= 8; step++) {
      console.log('setting step', step, status)
      setCurrentResetStep(step)
      const result = await handleUpdateStep({
        number: step,
        status 
      })

      if (result) {
        console.log('updated step', step, status)
      }
    }

    setUpdatingAllSteps(false)
        
    // navigate(`${routes.setUpWizard.url}/${getInstanceYear(instance)}`)
    window.location.reload()
  }

  const handleCreateOBStep = async () => {
    console.log('click update step...')
    setCreatingStep(true)
    const result = await handleAddStep({
      number: stepNumber,
      status: stepStatus,
      description 
    })

    console.log(result)

    setCreatingStep(false)
  }

  return {
    creatingStep,
    updatingStep,
    updatingAllSteps,
    currentResetStep,
    currentUpdateStep,
    stepNumber,
    stepStatus,
    selectedStep,
    selectedStepStatus,
    handleUpdateSelectedStep,
    handleUpdateOBStep,
    handleResetOBSteps,
    handleCreateOBStep,
    showTestingButtons
  }
}

export default useDebugSetupWizard