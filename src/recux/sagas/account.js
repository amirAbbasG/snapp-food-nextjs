import {put, call, takeEvery} from "redux-saga/effects"
import {accountActionType, setAccount} from "../actions/account";
import {getAccountInformationApi} from "../../services/userServices";

export function* getAccountInformation() {
        yield takeEvery(accountActionType.GET_ACCOUNT, fetchAccountInformation)
}

export function* fetchAccountInformation(){
        if (typeof window !== 'undefined') {
                const {data: {user}} = yield call(getAccountInformationApi)
                yield put(setAccount(user))
        }
}
