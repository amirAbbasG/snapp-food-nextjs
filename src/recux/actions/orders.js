export const orderActionType = {
    GET_ORDERS: "GET_ORDERS",
    SET_ORDERS: "SET_ORDERS",
    CLEAR_ORDERS: "CLEAR_ORDERS",
    RE_ORDER: "RE_ORDER",
    RE_ORDER_RESULT: "RE_ORDER_RESULT",
    ADD_TO_CART: "ADD_TO_CART",
    ADD_TO_CART_RESULT: "ADD_TO_CART_RESULT",
    REMOVE_CART_FOOD: "REMOVE_CART_FOOD",
    REMOVE_CART_FOOD_RESULT: "REMOVE_CART_FOOD_RESULT",
    REMOVE_CART: "REMOVE_CART",
    REMOVE_CART_RESULT: "REMOVE_CART_RESULT",

}


export const getOrders= () => {
    return {type: orderActionType.GET_ORDERS};
};

export const setOrders = (orders) => {
    return {type: orderActionType.SET_ORDERS, payload: orders};
};

export const clearOrders = () => {
    return {type: orderActionType.CLEAR_ORDERS};

};

export const addToCart = (foodId) => {
    return { type: orderActionType.ADD_TO_CART, payload: foodId }

};

export const reOrder = (orderId) => {
    return { type: orderActionType.RE_ORDER, payload: orderId }

};

export const removeCartFood = (foodId) => {
    return { type: orderActionType.REMOVE_CART_FOOD, payload: foodId }
};

export const removeCart = (orderId) => {
    return { type: orderActionType.REMOVE_CART, payload: orderId }

};
