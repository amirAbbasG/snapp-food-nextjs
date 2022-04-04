import {orderActionType} from "../actions/orders";

export const ordersReducer = (state = [], action) => {
    switch (action.type) {
        case orderActionType.SET_ORDERS:
            return action.payload;
        case orderActionType.CLEAR_ORDERS:
            return []
        case orderActionType.ADD_TO_CART_RESULT:
            //payload : order : {}
            const prvOrders = [...state].filter(
                (o) => o._id !== action.payload._id
            );
            return [...prvOrders, action.payload]
        case orderActionType.RE_ORDER_RESULT:
            //payload : order : {}
            return state.concat(action.payload)
        case orderActionType.REMOVE_CART_FOOD_RESULT:
            //payload : order : {}
            const orders = [...state].filter(
                (o) => o._id !== action.payload._id
            );
            return [...orders, action.payload]
        case orderActionType.REMOVE_CART_RESULT:
            //payload : orderId : ""
            return state.filter((o) => o._id !== action.payload);
        default:
            return state
    }
}
