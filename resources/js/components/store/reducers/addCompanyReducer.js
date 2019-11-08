import * as Types from "../actions/types";

const init = {
    isLoginAuth: false,
    product: [],
    com_reg_success: "",
    com_log_success: []
};

const addCompanyReducer = (state = init, action) => {
    switch (action.type) {
        case Types.ADD_COMPANY: {
            return {
                ...state,
                com_reg_success: action.payload.com_reg_success
            };
        }
        case Types.LOGIN_COMPANY: {
            return {
                ...state,
                com_log_success: action.payload.com_log_success,
                isLoginAuth: action.payload.auth
            };
        }
        case Types.CHECK_LOGIN: {
            return {
                ...state,
                isLoginAuth: action.payload.auth
            };
        }

        default:
            return state;
    }
};

export default addCompanyReducer;
