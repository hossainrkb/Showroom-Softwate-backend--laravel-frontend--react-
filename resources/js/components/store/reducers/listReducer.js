import * as Types from "../actions/types";
const listReducer = (state = [], action) => {
    switch (action.type) {
        case Types.PRODUCT_LIST: {
            return action.payload.product_list;
        }
      
        default:
            return state;
    }
};
export default listReducer;
