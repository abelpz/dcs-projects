import { UserApi } from "dcs-js"
import { useCallback, useState } from "react"


const useRepoApi = (token, dispatch, action) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [repos, setRepositories] = useState([])
    const [resources, setRes] = useState({})

    const setRepos = useCallback(
        async (username) => {
            try {
                setIsLoading(true)
                const userClient = new UserApi({
                    apiKey: (key) => (key === 'Authorization' && `token ${token}`)
                })
                const reposList = await userClient.userListRepos(username).then(({ data }) => data)

                //Sort by update date, most recent first.
                reposList.sort((a, b) => {
                    if (a.updated_at < b.updated_at) {
                        return 1;
                    }
                    if (a.updated_at > b.updated_at) {
                        return -1;
                    }
                    return 0;
                })
                setIsLoading(false)
                setRepositories(reposList)
            } catch (error) {
                console.error(error)
                setIsLoading(false)
                setError(true)
            }  
        }
    ,[token])
    const setResources = (repos) => {
        setRes(repos)
        dispatch(action(repos))
    }
    return [isLoading, error, repos, setRepos, resources, setResources]
}

export default useRepoApi