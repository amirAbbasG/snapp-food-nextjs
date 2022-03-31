import {take, put, call, takeEvery} from "redux-saga/effects"
import {accountActionType, setAccount} from "../actions/account";
import http from "../../services";

export function* getAccountInformation() {
        yield takeEvery(accountActionType.GET_ACCOUNT, fetchAccountInformation)
}

export function* fetchAccountInformation(){
        const {data: {user}} = yield call(http, "user")
        yield put(setAccount(user))
}
