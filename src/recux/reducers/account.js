import {accountActionType} from "../actions/account";

export const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case accountActionType.SET_ACCOUNT:
            return action.payload;
        case accountActionType.CLEAR_ACCOUNT:
            return {}
        default:
            return state
    }
}
