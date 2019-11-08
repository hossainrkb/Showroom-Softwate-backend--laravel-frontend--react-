import * as Types from "./types";
import Axios from "axios";

export const addProduct = (product) => dispatch => {
    Axios.post(`http://127.0.0.1:8000/api/product/add`, product)
        .then(response => {
            dispatch({
                type: Types.ADD_PRODUCT,
                payload: { success: response.data }
            });
           
        })
        .catch(error => {
            dispatch({
                type: Types.PRODUCT_ERROR,
                payload: { error: error.response.data }
            });
        });
};
export const ClearAddProduct = () => dispatch => {
            dispatch({
                type: Types.ADD_PRODUCT,
                payload: { success: "" }
            });
            
      
}


export const productList = () => dispatch => {
    Axios.get("http://127.0.0.1:8000/api/product/list")
        .then(res => {
            dispatch({
                type: Types.PRODUCT_LIST,
                payload: {
                    product_list: res.data
                }
            });
        })
        .catch(error => {
            dispatch({
                type: Types.PRODUCT_ERROR,
                payload: {
                    error: error
                }
            });
        });
};

