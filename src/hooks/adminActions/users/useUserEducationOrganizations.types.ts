// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { ToastId } from '@chakra-ui/toast'
import { DeletingState } from '../../../core/deletingState.types'
import {
  Organization, StaffClassification 
} from '../../../core/Tenant.types'
import { UserEducationOrganizationData } from '../../../core/userEducationOrganizations/UserEducationOrganizations.types'

export interface UpdateState {
    updating: boolean 
    educationOrganizationId: string
}

export interface EdOrgViewItem {
    educationOrganizationId: number | string
    shortNameOfInstitution: string
    nameOfInstitution: string
    staffClassification: string
    source: string
}

export interface UserEducationOrganizationsHook {
    educationOrganizationName: string
    staffClassificationDescriptor: string
    userEdOrgsList: UserEducationOrganizationData[]
    viewEdOrgsList: EdOrgViewItem[]
    organizationsList: Organization[]
    staffClassificationsList: StaffClassification[]
    showAddItem: boolean
    edOrgToEdit: EdOrgViewItem | null
    isCreatingUserEducationOrganization: boolean
    isUpdatingUserEducationOrganization: boolean 
    isDeletingUserEducationOrganization: DeletingState 
    isFetchingData: boolean
    onRefresh: () => Promise<void>
    onCancelEdit: () => void
    onCloseAddItem: () => void
    onEditEdOrg: (educationOrganizationId: string, staffClassification: string) => void
    onShowAddItem: () => void
    onUpdateEducationOrganization: (educationOrganizationId: string) => Promise<void>
    onSelectEducationOrganizationName: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onSelectStaffClassificationDescriptor: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onDeleteEducationOrganization: (educationOrganizationId: string, staffClassification: string) => Promise<void>
    onSaveEdOrgs: () => Promise<ToastId | undefined>
}