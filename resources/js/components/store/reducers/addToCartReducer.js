import * as Types from "../actions/types";

const init = {
    isAuthenticated: false,
    cart: [],
    error: {},
    hola_success: "",
    cartSuccess: ""
};

const addToCartReducer = (state = init, action) => {
    switch (action.type) {
        case Types.ADD_CART: {
            return {
                ...state,
                cartSuccess: action.payload.cartSuccess
            };
        }
        default:
            return state;
    }
};

export default addToCartReducer;
