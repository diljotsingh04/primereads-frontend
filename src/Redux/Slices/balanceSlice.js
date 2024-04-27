import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amount: 10
}

export const amountSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action) => {
            state.amount = action.payload
        },
    },
})

export const { setBalance } = amountSlice.actions

export default amountSlice.reducer