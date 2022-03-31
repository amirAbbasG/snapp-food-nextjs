export const accountActionType = {
    GET_ACCOUNT: "GET_ACCOUNT",
    SET_ACCOUNT: "SET_ACCOUNT",
    CLEAR_ACCOUNT: "CLEAR_ACCOUNT"
}


export const getAccountInformation = () => {
    return {type: accountActionType.GET_ACCOUNT};
};

export const setAccount = (user) => {
    return {type: accountActionType.SET_ACCOUNT, payload: user};
};

export const clearAccount = () => {
    return {type: accountActionType.CLEAR_ACCOUNT};

};
