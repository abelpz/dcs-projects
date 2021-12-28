import { createAuthSlice } from "@store/tools/createAuthSlice"

const initialState = {}

const orgSlice = createAuthSlice({
    name: 'org',
    initialState,
    reducers: {
        orgAdded(state, action) {
            for (const field in action.payload) {
                state[field] = action.payload[field]
            }
        }
    }
})

export default orgSlice.reducer

export const { orgAdded } = orgSlice.actions