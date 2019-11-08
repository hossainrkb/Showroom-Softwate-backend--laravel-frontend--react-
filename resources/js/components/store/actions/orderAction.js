import * as Types from "./types";
import Axios from "axios";


export const addOrder = order => dispatch => {
    Axios.post(`http://127.0.0.1:8000/api/order/add`, order)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: Types.ADD_ORDER,
                payload: { orderSuccess: response.data }
            });
        })
        .catch(error => {
            console.log(error);
        });
};




