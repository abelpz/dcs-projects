import { createAuthSlice } from "@store/tools/createAuthSlice"

const initialState = {list:[]}

const resourcesSlice = createAuthSlice({
    name: 'resources',
    initialState,
    reducers: {
        resourcesListUpdated(state, action) {
            state.list = action.payload
        }
    }
})

export default resourcesSlice.reducer

export const { resourcesListUpdated } = resourcesSlice.actions