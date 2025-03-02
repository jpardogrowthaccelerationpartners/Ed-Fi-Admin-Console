import { useConfig } from '@edfi/admin-console-shared-sdk'
import { EdfiClaimSet } from '../../../../core/Edfi/EdfiClaimsets'
import useHttpService from '../../../../hooks/http/useHttpService'
import { EdfiActionParams } from '../../adminAction.types'
import { GetClaimsetsListResult } from './ClaimsetsService.results'

const useEdfiClaimsetsService = () => {
  const { getAsync } = useHttpService()
  const { config } = useConfig()

  const getClaimsetsList = async (actionParams: EdfiActionParams): GetClaimsetsListResult => {
    const baseUrl = actionParams.edxApiUrl

    // const url = `${baseUrl}/${edfiActionRoutes.getClaimsetsList(actionParams.tenantId)}`
    // const url = '/data-claimsets.json'
    const url = actionParams.config.api?.useLocalMockData ?? true
      ? `${config?.app.basePath}/mockdata/adminapi/data-claimsets.json`
      : `${baseUrl}/v2/claimSets`
    
    const result = await getAsync<EdfiClaimSet[]>({
      url,
      actionName: 'Get Claimset List',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }

  const getClaimsetsListForSchoolYear = async (actionParams: EdfiActionParams, year: number): GetClaimsetsListResult => {
    const baseUrl = actionParams.edxApiUrl
    // const url = `${baseUrl}/${edfiActionRoutes.getClaimsetsListForSchoolyear(actionParams.tenantId, year)}`
    const url = `${baseUrl}/v2/claimSets`
    
    const result = await getAsync<EdfiClaimSet[]>({
      url,
      actionName: 'Get Claimset List',
      access_token: actionParams.token,
      apiConfig: actionParams.config.api
    })
    
    return result
  }
    
  return {
    getClaimsetsList,
    getClaimsetsListForSchoolYear
  }
}

export default useEdfiClaimsetsService