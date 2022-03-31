import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"
import {reducers} from "../reducers"
import {initSagas} from "../sagas";

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]


const configStore = () => {
    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    initSagas(sagaMiddleware)

    return store
}

export default configStore
