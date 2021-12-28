import { createAuthSlice } from "@store/tools/createAuthSlice"

const initialState = {
  saveToken: false
}

const settingsSlice = createAuthSlice({
    name: 'settings',
    initialState,
    reducers: {
      settingsAdded(state, action) {
        return action.payload
      },
      settingsLogout(state, action) {
        state.saveToken = false
      }
    }
})

export default settingsSlice.reducer

export const { settingsAdded, settingsLogout } = settingsSlice.actions