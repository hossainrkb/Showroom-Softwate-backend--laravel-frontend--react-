import { combineReducers } from "redux";
import addProductReducer from "./addProductReducer";
import listReducer from "./listReducer";
import cartReducer from "./cartReducer";
import saleTypeReducer from "./saleTypeReducer";
import addToCartReducer from "./addToCartReducer";
import addOrderReducer from "./addOrderReducer";
import addCompanyReducer from "./addCompanyReducer";


const rootReducer = combineReducers({
    product: addProductReducer,
    list: listReducer,
    cart: addToCartReducer,
    cart_list: cartReducer,
    saleType_list: saleTypeReducer,
    add_order: addOrderReducer,
    add_company: addCompanyReducer
});

export default rootReducer;
