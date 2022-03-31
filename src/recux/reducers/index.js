import {combineReducers} from "redux";

import {accountReducer} from "../reducers/account";
import {ordersReducer} from "../reducers/orders";

export const reducers = combineReducers({
    account: accountReducer,
    orders : ordersReducer
})
