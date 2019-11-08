import * as Types from "../actions/types";

const init = {
    isAuthenticated: false,
    product: [],
    error: {},
    hola_success: "",
    success: ""
};

const addProductReducer = (state = init, action) => {
    switch (action.type) {
        case Types.ADD_PRODUCT:{
            return {
                ...state,
                success:action.payload.success
            }
        }
        case Types.PRODUCT_ERROR:{
            return {
                ...state,
                error:action.payload.error
            }
        }

        default:
            return state;
    }
};

export default addProductReducer;
