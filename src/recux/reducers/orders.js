import {orderActionType} from "../actions/orders";

export const ordersReducer = (state = [], action) => {
    switch (action.type) {
        case orderActionType.SET_ORDERS:
            return action.payload;
        case orderActionType.CLEAR_ORDERS:
            return []
        default:
            return state
    }
}
