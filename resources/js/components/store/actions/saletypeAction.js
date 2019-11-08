import * as Types from "./types";
import Axios from "axios";
export const saletypeList = () => dispatch => {
    Axios.get("http://127.0.0.1:8000/api/saleType/list")
        .then(res => {
            console.log(res.data)
            dispatch({
                type: Types.SALETYPE_LIST,
                payload: {
                    saletype_list: res.data
                }
            });
        })
        .catch(error => {
          console.log(error)
        });
};
