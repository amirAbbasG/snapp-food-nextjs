import {put, call, takeEvery} from "redux-saga/effects"
import {accountActionType, setAccount} from "../actions/account";
import {getAccountInformationApi} from "../../services/userServices";

export function* getAccountInformation() {
    yield takeEvery(accountActionType.GET_ACCOUNT, fetchAccountInformation)
}

export function* fetchAccountInformation() {

    if (typeof window !== "undefined") {
        const {data: {user}, status} = yield call(getAccountInformationApi)
        if (status === 200) {

            yield put(setAccount(user))
        }
    }
}
