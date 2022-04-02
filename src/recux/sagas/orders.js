import { put, call, takeEvery, takeLatest} from "redux-saga/effects"
import {orderActionType, setOrders} from "../actions/orders";
import http from "../../services";
import {addToCartApi} from "../../services/orderServices";


//#region get orders
export function* getOrders() {
        yield takeEvery(orderActionType.GET_ORDERS, fetchOrders)
}

export function* fetchOrders(){
        const {data: {userOrders}} = yield call(http, "orders")
        yield put(setOrders(userOrders))
}
//#endregion

//#region add to cart
export function* addToCart () {
        yield takeLatest(orderActionType.ADD_TO_CART, callAddToCartApi)
}

function* callAddToCartApi ({payload}){
        const {data: {order}} = yield call(addToCartApi, payload)
        console.log({order})
        yield put({type: orderActionType.ADD_TO_CART_RESULT, payload: order})
}
//#endregion
