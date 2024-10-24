import { OnBoardingWizardData } from "./onBoardingWizard/onBoardingWizard.types"

export interface InstanceEdfiStatus {
  operationStatus: InstanceOperationStatus
  onboardingStatus: InstanceOnboardingStatus
}

export type InstanceOperationStatus = 'Operational' | 'Outage'
export type InstanceOnboardingStatus = 'Empty' | 'Populated'

export interface ODSInstance {
  instanceId: string
  tenantId: string
  instanceName: string
  instanceType: string 
  connectionType: string
  clientId: string
  clientSecret: string
  baseUrl: string 
  authenticationUrl: string 
  resourcesUrl: string 
  schoolYears: number[]
  isDefault: boolean
  verificationStatus: OnBoardingWizardData | null
  provider: string 
}

export interface ExtendedODSInstance extends ODSInstance {
  edFiVersion: string 
  tsdsVersion: string 
  edFiStatus: InstanceEdfiStatus
}

export interface SelectedConnection {
  id: string
  connectionName: string
  databaseEngine: string
  edFiVersion: string
  edFiExtension: string
  hostingProvider: string
  allowedTenantIds: string[]
  tiers: Tier[]
  createdBy: string
  createdDateTime: string
  lastModifiedBy: string
  lastModifiedDateTime: string
  connectionType: string
}

export interface Tier {
  tierId: string
  tierName: string
  odsApiConnection: OdsApiConnection
  sqlConnection: SqlConnection
}

export interface Databases {
  admin: AdminDatabase
  security: SecurityDatabase
  ods: OdsDatabase[]
}

export interface AdminDatabase {
  selectedTierId: string,
  selectedTierName: string,
  status: string,
  jobs: DatabaseJobs
}

export interface SecurityDatabase {
  selectedTierId: string
  selectedTierName: string
  status: string
  jobs: DatabaseJobs
}

export interface OdsDatabase {
  selectedTierId: string
  selectedTierName: string
  status: string
  jobs: DatabaseJobs
  year: number
  odsBackupCode: string
  odsBackupDescription: string
}

export interface DatabaseJobs {
  createJobId: string
  deleteJobId: string
  resetDeleteJobId: string
  resetCreateJobId: string
  generateReportsJobId: string
}

export interface OdsApiConnection {
  clientId: string
  clientSecret: string
  tokenUrl: string
  endpoints: Endpoint[]
  metadataUrl: string
}

export interface SqlConnection {
  sqlServer: string
  sqlServerUserName: string
  sqlServerPassword: string
  azureSubscriptionId: string
  azureResourceGroupName: string
  azureServerName: string
  azureServerElasticPoolName: string
}

export interface Endpoint {
  accessTypeId?: string
  compositesUrl?: string
  resourcesUrl?: string
}

export interface AvailableInstance {
    isSelected: boolean
    district: string
    instanceYear: string 
    edfiVersion: string 
    edfiStatus: InstanceEdfiStatus
}

export interface InstanceDescription {
    name: string 
    description: string 
    connection: string 
    edfiExtension: string 
    edfiVersion: string 
    edfiStatus: InstanceEdfiStatus
    tsdsVersion: string
    educationOrgId: string 
    stateOrgId: string 
    campusesCount: number
    staffCount: number 
    studentsCount: number 
    coursesCount: number
}
