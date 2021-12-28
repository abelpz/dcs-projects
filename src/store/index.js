import { configureStore } from '@reduxjs/toolkit'
import { loadState } from '@utils/localStorage'

import authReducer from '@store/slices/auth'
import orgReducer from '@store/slices/org'
import resourcesReducer from '@store/slices/resources'
import settingsReducer from '@store/slices/settings'
import { TOKEN_ID } from '@common/constants'

export default configureStore({
  reducer: {
    auth: authReducer,
    org: orgReducer,
    resources: resourcesReducer,
    settings: settingsReducer
  },
  preloadedState: loadState({key: TOKEN_ID, strict: true})
})