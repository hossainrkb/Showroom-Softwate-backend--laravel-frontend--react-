import * as Types from "./types";
import Axios from "axios";
import { isObject } from "util";

export const addCompany = company => dispatch => {
    console.log(company)
    Axios.post(`http://127.0.0.1:8000/api/company/add`, company)
        .then(response => {
            dispatch({
                type: Types.ADD_COMPANY,
                payload: { com_reg_success: response.data }
            });
        })
        .catch(error => {
            dispatch({
                type: Types.PRODUCT_ERROR,
                payload: { error: error.response.data }
            });
        });
};
export const loginCompany = (login_company,history) => dispatch => {
    console.log(login_company);
    Axios.post(`http://127.0.0.1:8000/api/company/login`, login_company)
        .then(response => {
            dispatch({
                type: Types.LOGIN_COMPANY,
                payload: { com_log_success: response.data
                }
            });
         //  if(response.data === Array){
                console.log(response.data)
               if(isObject(response.data)){
                    localStorage.setItem("token", response.data.comp_code);
                    dispatch({
                        type: Types.LOGIN_COMPANY,
                        payload: { com_log_success: response.data, auth: true }
                    }); 
                    history.push("/");
               }
          // }
          // else{
          //     console.log(response.data)
         //  }
        })
        .catch(error => {
            console.log(error);
        });

       

};
export const ClearCompanyRegister = () => dispatch => {
    dispatch({
        type: Types.ADD_COMPANY,
        payload: { success: "" }
    });
};

 export const logout = history => {
     localStorage.removeItem("token");
     history.push("/loginCompany");
     return {
         type: Types.LOGIN_COMPANY,
         payload: {
             com_log_success: "",
             auth: false
         }
     };
 };
