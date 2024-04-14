import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    name: null,
    email: null,
    userImage: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createuser: (state, action) => {
            state.id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.userImage = action.payload.userImage
        },
        removeUser: (state) => {
            state.id = null
            state.name = null
            state.email = null
            state.userImage = null
        }
    },
})

export const { createuser, removeUser } = userSlice.actions

export default userSlice.reducer