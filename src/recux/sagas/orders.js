import {put, call, takeEvery, takeLatest, take} from "redux-saga/effects"
import {orderActionType, setOrders} from "../actions/orders";
import {addToCartApi, reOrderApi, removeCartFoodApi, removeCartApi, getOrdersApi} from "../../services/orderServices";


//#region get orders
export function* getOrders() {
    yield takeEvery(orderActionType.GET_ORDERS, fetchOrders)
}

export function* fetchOrders() {
    if (typeof window !== "undefined"){

    const {data: {userOrders}, status} = yield call(getOrdersApi)
    if (status === 200) {
        yield put(setOrders(userOrders))
    }
    }

}

//#endregion

//#region add to cart
export function* addToCart() {
    yield takeLatest(orderActionType.ADD_TO_CART, callAddToCartApi)
}

function* callAddToCartApi({payload}) {
    const {data: {order}} = yield call(addToCartApi, payload)
    yield put({type: orderActionType.ADD_TO_CART_RESULT, payload: order})
}

//#endregion

//#region re order

export function* reOrder() {
    const {payload} = yield take(orderActionType.RE_ORDER)
    const {data: {order}, error} = yield call(reOrderApi, payload)
    console.log({error})
    console.log({order})
    yield put({type: orderActionType.RE_ORDER_RESULT, payload: order})
}

//#endregion

//#region remove cart food

export function* removeCartFood() {
    while (true) {
        const {payload} = yield take(orderActionType.REMOVE_CART_FOOD)
        console.log({payload})
        const {data: {order}} = yield call(removeCartFoodApi, payload)
        yield put({type: orderActionType.REMOVE_CART_FOOD_RESULT, payload: order})
    }
}

//#endregion

//#region remove cart

export function* removeCart() {
    while (true) {
        const {payload} = yield take(orderActionType.REMOVE_CART)
        const {data: {done}} = yield call(removeCartApi, payload)
        if (done) {
            yield put({type: orderActionType.REMOVE_CART_RESULT, payload})
        }
    }
}

//#endregion
