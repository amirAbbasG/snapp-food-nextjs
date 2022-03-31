import * as accountSaga from "./account"
import * as ordersSaga from "./orders"

export function initSagas (sagaMiddleware){
    Object.values(accountSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware))
    Object.values(ordersSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware))
}
