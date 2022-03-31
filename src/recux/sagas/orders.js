import { put, call, takeEvery} from "redux-saga/effects"
import {orderActionType, setOrders} from "../actions/orders";
import http from "../../services";

export function* getOrders() {
        yield takeEvery(orderActionType.GET_ORDERS, fetchOrders)
}

export function* fetchOrders(){
        const {data: {userOrders}} = yield call(http, "orders")
        yield put(setOrders(userOrders))
}
