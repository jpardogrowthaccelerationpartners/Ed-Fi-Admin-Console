import { UserProfileContext } from '@edfi/admin-console-shared-sdk'
import { useContext } from 'react'
import { AppUser } from '../../../core/AppUser.types'
import { ActionParams } from "../../../services/AdminActions/adminAction.types"
import useUsersService from "../../../services/AdminActions/Users/UsersService"
import { AddUserRequest, AssignBulkLicensesRequest, AssignLicenseRequest, InviteUserRequest, RevokeBulkLicensesRequest, RevokeLicenseRequest, UpdateUserRequest } from "../../../services/AdminActions/Users/UsersService.requests"
import useEDXToast from "../../common/useEDXToast"
import { CreateUserFormData, SubscriptionOption } from "./useCreateUserForm.types"

const useUserFormActions = () => {
    const { userProfile } = useContext(UserProfileContext)
    const { addUser, inviteUser, assignBulkLicenses, revokeBulkLicenses, updateUser } = useUsersService()
    const { successToast, errorToast } = useEDXToast()

    const onAddUser = async (actionParams: ActionParams, userData: CreateUserFormData) => {
        const requestData: AddUserRequest = {
            tenantId: userProfile?.tenantId as string,
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            lockOutEnabled: true,
            autoGeneratedPassword: true,
            twoFactorEnabled: false,
            assignLicenseRequests: userData.licenses.map(license => ({...license}))
        }

        const result = await addUser(actionParams, requestData)
        console.log('request data', requestData)

        if (result.type === 'Response') 
            successToast(`Added user: ${requestData.firstName} ${requestData.lastName}`)
        else 
            errorToast(`${result.actionMessage}`)
    }

    const onInvite = async (actionParams: ActionParams, userData: CreateUserFormData) => {
        const requestData: InviteUserRequest = {
            tenantId: userProfile?.tenantId as string,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            inviter: {
                firstName: userProfile?.firstName as string,
                lastName: userProfile?.lastName as string
            },
            role: userData.role,
            assignLicenseRequests: userData.licenses.map(license => ({...license})),
            invitingUserDisplayName: `${userProfile?.firstName} ${userProfile?.lastName}`
        }

        const result = await inviteUser(actionParams, requestData)
        console.log('invite user request result', result)

        if (result.type === 'Response') 
            successToast(`Invited user: ${requestData.firstName} ${requestData.lastName}`)
        else 
            errorToast(`${result.actionMessage}`)
    }

    const onUpdateInvite = async (actionParams: ActionParams, userData: CreateUserFormData) => {
        const requestData: InviteUserRequest = {
            tenantId: userProfile?.tenantId as string,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            inviter: {
                firstName: userProfile?.firstName as string,
                lastName: userProfile?.lastName as string
            },
            role: userData.role,
            assignLicenseRequests: userData.licenses.map(license => ({...license})),
            invitingUserDisplayName: `${userProfile?.firstName} ${userProfile?.lastName}`,
            // dontSendEmail: true
        }

        const result = await inviteUser(actionParams, requestData)
        console.log('invite user request result', result)

        if (result.type === 'Response') 
            successToast("Updated Invitation")
        else 
            errorToast(`${result.actionMessage}`)
    }

    const onInviteAdmin = async (actionParams: ActionParams, userData: CreateUserFormData) => {
        const requestData: InviteUserRequest = {
            tenantId: userProfile?.tenantId as string,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            inviter: {
                firstName: userProfile?.firstName as string,
                lastName: userProfile?.lastName as string
            },
            role: userData.role,
            assignLicenseRequests: userData.licenses.map(license => ({...license})),
            invitingUserDisplayName: `${userProfile?.firstName} ${userProfile?.lastName}`
        }

        console.log('data to invite a user', requestData)
        
        const result = await inviteUser(actionParams, requestData)
        console.log('invite user request result', result)

        if (result.type === 'Response') 
            successToast(`Invited Admin User: ${requestData.firstName} ${requestData.lastName}`)
        else 
            errorToast(`${result.actionMessage}`)
    }

    const onUpdate = async (actionParams: ActionParams, userData: CreateUserFormData, userId: string) => {
        const requestData: UpdateUserRequest = {
            tenantId: actionParams.tenantId,
            userId,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            email: userData.email
        }

        const result = await updateUser(actionParams, requestData)
        console.log('update user request result', result)

        if (result.type === 'Response') 
            successToast(`Updated User: ${requestData.firstName} ${requestData.lastName}`)
        else 
            errorToast(`${result.actionMessage}`)

    }

    const selectBulkRequests = (editUserInitialData: AppUser, subscriptionsOptionList: SubscriptionOption[]) => {
        console.log('current user license data', subscriptionsOptionList)

        const assignLicensesList: AssignLicenseRequest[] = []
        const revokeLicensesList: RevokeLicenseRequest[] = []

        for (let option of subscriptionsOptionList) {
            const index = editUserInitialData.licenses.findIndex(license => license.tenantSubscriptionId === option.subscriptionId)

            if (option.checked && index === -1) {
                console.log('adding a license', option)
                const assignRequest: AssignLicenseRequest = {
                    applicationId: option.applicationId,
                    subscriptionId: option.subscriptionId,
                    tenantId: userProfile?.tenantId as string,
                    userId: editUserInitialData.userId
                }

                if (option.selectedRole) {
                    console.log('option has selected role', option.selectedRole)
                    assignRequest.roles = []
                    assignRequest.roles.push(option.selectedRole)
                }

                console.log('assign request', assignRequest)

                assignLicensesList.push(assignRequest)
            }
            else if (option.checked && index !== -1) {
                console.log('updating a license role')
                const assignRequest: AssignLicenseRequest = {
                    applicationId: option.applicationId,
                    subscriptionId: option.subscriptionId,
                    tenantId: userProfile?.tenantId as string,
                    userId: editUserInitialData.userId 
                }

                if (option.selectedRole && editUserInitialData.licenses[index].applicationRole[0].role !== option.selectedRole) {
                    console.log('should add assign request')
                    assignRequest.roles = []
                    assignRequest.roles.push(option.selectedRole)

                    assignLicensesList.push(assignRequest)
                }
            }
            else if (!option.checked && index !== -1) {
                console.log('removing a license')
                const revokeRequest: RevokeLicenseRequest = {
                    applicationId: option.applicationId,
                    subscriptionId: option.subscriptionId,
                    tenantId: userProfile?.tenantId as string,
                    userId: editUserInitialData.userId 
                }

                revokeLicensesList.push(revokeRequest)
            }
        }

        console.log('assign licenses list', assignLicensesList)
        console.log('revoke licenses list', revokeLicensesList)

        return {
            assignLicensesList,
            revokeLicensesList
        }
    }

    const onManageSubscriptions = async (actionParams: ActionParams, editUserInitialData: AppUser, subscriptionsOptionList: SubscriptionOption[]) => {
        const assignLicensesRequestData: AssignBulkLicensesRequest = {
            tenantId: actionParams.tenantId,
            userId: editUserInitialData.userId,
            assignLicenseRequests: []
        }

        const revokeLicensesRequestData: RevokeBulkLicensesRequest = {
            tenantId: actionParams.tenantId,
            userId: editUserInitialData.userId,
            revokeLicenseRequests: []
        }

        const bulkRequests = selectBulkRequests(editUserInitialData, subscriptionsOptionList)
        if (bulkRequests) {
            assignLicensesRequestData.assignLicenseRequests = [...bulkRequests.assignLicensesList]
            revokeLicensesRequestData.revokeLicenseRequests = [...bulkRequests.revokeLicensesList]
        }

        console.log('assign data', assignLicensesRequestData)
        console.log('revoke data', revokeLicensesRequestData)

        let successAssign = true

        if (assignLicensesRequestData.assignLicenseRequests.length === 0 && revokeLicensesRequestData.revokeLicenseRequests.length === 0)
            return 

        if (assignLicensesRequestData.assignLicenseRequests.length > 0) {
            const result = await assignBulkLicenses(actionParams, assignLicensesRequestData)
            console.log('Assign licenses request result', result)

            if (result.type === 'Error')
                successAssign = false
        }

        if (revokeLicensesRequestData.revokeLicenseRequests.length > 0) {
            const result = await revokeBulkLicenses(actionParams, revokeLicensesRequestData)
            console.log('Revoke licenses request result', result)

            if (result.type === 'Error')
                successAssign = false
        }

        if (successAssign) 
            successToast("Updated Licenses.")
        else 
            errorToast(`${'Failed to assign licenses'}`)
    }

    return {
        onAddUser,
        onInvite,
        onUpdateInvite,
        onInviteAdmin,
        onUpdate,
        onManageSubscriptions
    }
}

export default useUserFormActions