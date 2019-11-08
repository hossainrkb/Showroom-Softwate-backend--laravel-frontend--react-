import * as Types from "../actions/types";
const cartReducer = (state = [], action) => {
    switch (action.type) {
        case Types.CART_LIST: {
            return action.payload.cart_list;
        }
        case Types.UPDATE_PRODUCT_CART: {
            let product = [...state];
            return product.map(pro => {
                if (pro.cart_id === action.payload.productCart.cart_id) {
                    return action.payload.productCart;
                }
                return pro;
            });
        }
        default:
            return state;
    }
};
export default cartReducer;
