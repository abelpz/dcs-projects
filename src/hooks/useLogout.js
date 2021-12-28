import store from '@store/index'
import useBatchDispatch from './useBatchDispatch'
import { tokenRemoved } from '@store/slices/auth'
import { settingsLogout } from '@store/slices/settings'
import { useDispatch } from 'react-redux'
import { saveState } from '@utils/localStorage'
import { TOKEN_ID } from '@common/constants'
  
const useLogout = () => {
  const batchDispatch = useBatchDispatch()
  const dispatch = useDispatch()
  return () => {
    dispatch(tokenRemoved())
    dispatch(settingsLogout())
    saveState(TOKEN_ID, store.getState())
      .then(batchDispatch('reset'))
  }
}
export default useLogout