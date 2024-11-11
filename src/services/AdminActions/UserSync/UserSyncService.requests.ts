import { DataRefreshType, JobMetadata, Schedule } from '../../../core/UserSync/UserSync.types'

export interface GetEdFiSyncExecutionsRequest {
    jobId: string
    pageIndex: number 
    pageSize: number  
    orderBy?: string 
    filter?: string 
}

export interface GetEdFiSyncJobByIdRequest {
	jobId: string 
}

export interface GetEdFiSyncExecutionLogsRequest {
    jobId: string 
    executionId: string 
    pageIndex: number 
    pageSize: number
	orderBy?: string 
	filterBy?: string
}

export interface ExecuteEdFiSync {
    jobId: string 
}

export interface UpdateEdFiSyncRequest {
    tenantId: string
	jobId: string
	name: string
	sourceConnectionId: string
	destinationConnectionId: string
	profileId: string
	jobPoints: number 
	applicationId: string
	dataRefreshType: DataRefreshType
	dataRefreshSpecificDate : string
	maxApiFailure: number
	maxApiRetry: number
	jobCompleteCallbackUrl?: string
    jobMetadata: JobMetadata[]
	schedule: Schedule
	notificationEmails?: string[]
}