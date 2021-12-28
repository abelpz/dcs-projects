import { OrganizationApi } from "dcs-js"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {orgAdded} from '@store/slices/org'

const useOrgApi = (token) => {
    const dispatch = useDispatch()
    const savedOrg = useSelector(state => state.org)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [orgs, setOrganizations] = useState([])
    const [org, setOrganization] = useState({})

    const setOrgs = useCallback(
        async () => {
            try {
                setIsLoading(true)
                const orgClient = new OrganizationApi({
                    apiKey: (key) => (key === 'Authorization' && `token ${token}`)
                })
                const orgsList = await orgClient.orgListCurrentUserOrgs().then(({ data }) => data)
                if (savedOrg) setOrganization(savedOrg)
                setIsLoading(false)
                setOrganizations(orgsList)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
                setError(true)
            }  
        }
    ,[token])
    const setOrg = (orgId) => {
        const selectedOrg = orgs?.find((org) => (org.id === orgId))
        setOrganization(selectedOrg)
        dispatch(orgAdded(selectedOrg))
    }
    return [isLoading, error, orgs, setOrgs, org, setOrg]
}

export default useOrgApi