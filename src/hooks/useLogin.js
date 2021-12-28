import { useState } from "react"
import { UserApi } from 'dcs-js'
import { loadState } from '@utils/localStorage'
import store from '@store/index'
import { TOKEN_ID } from '@common/constants'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { tokenAdded, userAdded } from '@store/slices/auth'
import useBatchDispatch from "./useBatchDispatch"

export default function useLogin(tokenId) {
    const { saveToken } = useSelector(state => state.settings)
    const dispatch = useDispatch()
    const batchDispatch = useBatchDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(undefined)

    const setLogin = async ({ username, password }) => {
        const savedState = loadState({key: TOKEN_ID, user: username})
        try {
            setIsLoading(true)
            const userClient = new UserApi({ username, password })
            const allTokens = await userClient.userGetTokens(username)
                .then(({ data }) => data)
            const appTokens = allTokens.filter((item) => item.name === tokenId)
            if (savedState && allTokens) {
                if (saveToken)
                    savedState = {
                        ...savedState,
                        settings: {
                            ...savedState.settings,
                            saveToken
                        }
                    }
                batchDispatch('set', savedState)
            } 
            if (appTokens?.length > 0) {
                appTokens.forEach((token) => {
                userClient.userDeleteAccessToken(username, token.id)
                })
            }
            const newToken = await userClient.userCreateToken(
                username,
                { name: tokenId }
            )
            .then(res => res.data)
            
            const {data: user} = await userClient.userGetCurrent()
            dispatch(userAdded({ 
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.full_name,
                avatar: user.avatar_url
            })) 
            if (newToken) {
                dispatch(tokenAdded(newToken))
                setError(false)
                setIsLoading(false)
                return newToken
            }
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            setError(true)
        }
    }
    return [isLoading, error, setLogin]
}