import { EdfiClaimSet } from "../../../../core/Edfi/EdfiClaimsets"
import useHttpService from "../../../../hooks/http/useHttpService"
import { EdfiActionParams } from "../../adminAction.types"
import edfiActionRoutes from "../../edfiActionRoutes"
import { GetClaimsetsListResult } from "./ClaimsetsService.results"

const useEdfiClaimsetsService = () => {
    const { getAsync } = useHttpService()

    const getClaimsetsList = async (actionParams: EdfiActionParams): GetClaimsetsListResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${edfiActionRoutes.getClaimsetsList(actionParams.tenantId)}`
        const url = '/mockdata/data-claimsets.json'
    
        const result = await getAsync<EdfiClaimSet[]>({
            url,
            actionName: 'Get Claimset List',
            access_token: actionParams.token
        })
    
        return result
    }

    const getClaimsetsListForSchoolYear = async (actionParams: EdfiActionParams, year: number): GetClaimsetsListResult => {
        const baseUrl = actionParams.edxApiUrl
        // const url = `${baseUrl}/${edfiActionRoutes.getClaimsetsListForSchoolyear(actionParams.tenantId, year)}`
        const url = '/mockdata/data-claimsets.json'
    
        const result = await getAsync<EdfiClaimSet[]>({
            url,
            actionName: 'Get Claimset List',
            access_token: actionParams.token
        })
    
        return result
    }
    
    return {
        getClaimsetsList,
        getClaimsetsListForSchoolYear
    }
}

export default useEdfiClaimsetsService