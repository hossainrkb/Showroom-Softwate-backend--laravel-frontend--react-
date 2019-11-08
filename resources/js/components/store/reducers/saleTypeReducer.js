import * as Types from "../actions/types";
const saleTypeReducer = (state = [], action) => {
    switch (action.type) {
        case Types.SALETYPE_LIST: {
            return action.payload.saletype_list;
        }
        default:
            return state;
    }
};
export default saleTypeReducer;
