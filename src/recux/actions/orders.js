export const orderActionType = {
    GET_ORDERS: "GET_ORDERS",
    SET_ORDERS: "SET_ORDERS",
    CLEAR_ORDERS: "CLEAR_ORDERS"
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
