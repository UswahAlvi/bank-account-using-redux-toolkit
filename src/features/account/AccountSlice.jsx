import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload.amount;
            state.isLoading = false;
        },
        withdraw(state, action) {
            if (state.balance >= action.payload) {
                state.balance -= action.payload;
            } else {
                console.error('Insufficient funds for withdrawal');
            }
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {
                        amount,
                        purpose
                    }
                }
            },
            reducer(state, action) {
                console.log(action.payload);
                state.loan += action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance+=action.payload.amount;
            }
        },
        payLoan(state) {
            state.balance = 0; // Pay off any outstanding balance
            state.loan = 0; // Reset loan amount after payment
            state.loanPurpose = ''; // Reset loan purpose
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
})
console.log(accountSlice);
export const { withdraw, payLoan, requestLoan } = accountSlice.actions;

export function deposit(amount, currency) {
    if (currency === "USD") {
        return { type: 'account/deposit', payload: {amount }}; 
    }
    return async function (dispatch) {
        dispatch({ type: 'account/convertingCurrency' });
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;
        dispatch({ type: 'account/deposit', payload: { amount: converted } }); // Corrected payload key
    }
}

export default accountSlice.reducer;
