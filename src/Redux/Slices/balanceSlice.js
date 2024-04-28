import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amount: null
}

export const amountSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBalance: (state, action) => {
            state.amount = action.payload
        },
        incrementBalance: (state, action) => {
            state.amount += action.payload
        },
        decrementBalance: (state, action) => {
            state.amount -= action.payload;
        },
    },
})

export const { setBalance, incrementBalance, decrementBalance } = amountSlice.actions

export default amountSlice.reducer