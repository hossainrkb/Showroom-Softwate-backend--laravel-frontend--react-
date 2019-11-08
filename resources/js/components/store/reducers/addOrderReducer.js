import * as Types from "../actions/types";

const init = {
    isAuthenticated: false,
    product: [],
    error: {},
    orderSuccess: "",
    success: ""
};

const addOrderReducer = (state = init, action) => {
                                                      
    switch (action.type) {
        case Types.ADD_ORDER: {
            return {
                ...state,
                orderSuccess: action.payload.orderSuccess
            };
        }

        default:
            return state;
    }
  
};

export default addOrderReducer;
