import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    token: ""
}

export const userSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id,
                state.name = action.payload.name,
                state.email = action.payload.email,
                state.profile_pic = action.payload.profile_pic
        },
        setToken: (state, action) => {
            state.token = state.payload
        },
        logOut: (state, action) => {
            state._id = "",
                state.name = "",
                state.email = "",
                state.profile_pic = "",
                state.token = ""
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken, logOut } = userSlice.actions

export default userSlice.reducer