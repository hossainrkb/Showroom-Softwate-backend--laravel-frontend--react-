import * as Types from "./types";
import Axios from "axios";

export const addToCart = product => dispatch => {
    Axios.post(`http://127.0.0.1:8000/api/cart/add`, product)
        .then(response => {
            dispatch({
                type: Types.ADD_CART,
                payload: { cartSuccess: response.data }
            });
        })
        .catch(error => {
           console.log(error)
        });
};
export const updateCart = (cart_id, cart_product) => dispatch => {
    Axios.put(`/api/transactions/${cart_id}`, cart_product)
        .then(response => {
            dispatch({
                type: Types.UPDATE_PRODUCT_CART,
                payload: { productCart: response.data.transaction }
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const cartList = () => dispatch => {
    Axios.get("http://127.0.0.1:8000/api/cart/list")
        .then(res => {
           
            dispatch({
                type: Types.CART_LIST,
                payload: {
                    cart_list: res.data
                }
            });
        })
        .catch(error => {
           console.log(error)
        });
};
