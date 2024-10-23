import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/account/AccountSlice";
import CustomerReducer from "./features/customer/CustomerSlice";

const store=configureStore({
    reducer:{
        account:accountReducer,
        customer:CustomerReducer,
    }
})
export default store;