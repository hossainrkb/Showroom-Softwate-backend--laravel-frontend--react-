import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav_Side from './Nav_side'
import Product_list from "./pages/Product_list";
import Add_Product from './pages/Add_product'
import Sale_Product from "./pages/Sale_product";
import Sales_report from "./pages/Sales_report";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import Todays_sale from "./pages/Todays_sale";
import All_time_sales from "./pages/All_time_sales";
import Regular_report from "./pages/Regular_report";
import WholeSale_report from "./pages/WholeSale_report";
import Installment_report from "./pages/Installment_report";
import Daily_installment_report from "./pages/Daily_installment";
import Invoice_payment from "./pages/Invoice_payment";
import Invoice_discount from "./pages/Invoice_discount";
import Invoice_print from "./pages/Invoice_print";
import Product_log from "./pages/Product_log";
import Add_company from "./pages/Add_company";
import Company_login from "./pages/Company_login";
import Todays_expense from "./pages/Today's_expense";
import Todays_deposit from "./pages/Today's_deposit";
import All_time_deposit from "./pages/All_time_deposit";
import All_time_expense from "./pages/All_time_expense";
import Order_confirm from "./pages/Order_confirm";
import Add_customer from "./pages/Add_customer";
import Dashboard from './pages/Dashboard'
import store from "./store/index";
import { Provider } from "react-redux";
import * as Types from "./store/actions/types";
const get_token = localStorage.getItem("token");

if (get_token) {
    //let decode = jwtDecode(get_token);
   // setAuthToken(get_token);
    store.dispatch({
        type: Types.LOGIN_COMPANY,
        payload: { com_log_success: get_token , auth:true}
    });
}
export default class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/product/log" exact component={Product_log} />
                    <Route
                        path="/addCustomer"
                        exact
                        component={Add_customer}
                    />
                    <Route
                        path="/allTimeExpense"
                        exact
                        component={All_time_expense}
                    />
                    <Route
                        path="/allTimeDeposit"
                        exact
                        component={All_time_deposit}
                    />
                    <Route
                        path="/todaysDeposit"
                        exact
                        component={Todays_deposit}
                    />
                    <Route
                        path="/todaysExpense"
                        exact
                        component={Todays_expense}
                    />
                    <Route
                        path="/dailyInstallmentSales"
                        exact
                        component={Daily_installment_report}
                    />
                    <Route
                        path="/installmentSales"
                        exact
                        component={Installment_report}
                    />
                    <Route
                        path="/wholeSales"
                        exact
                        component={WholeSale_report}
                    />
                    <Route
                        path="/regularSales"
                        exact
                        component={Regular_report}
                    />
                    <Route
                        path="/allTimesSalesHistory"
                        exact
                        component={All_time_sales}
                    />
                    <Route
                        path="/todaysSalesHistory"
                        exact
                        component={Todays_sale}
                    />
                    <Route path="/salesReport" exact component={Sales_report} />
                    <Route
                        path="/invoice_print/:invoice_id"
                        exact
                        component={Invoice_print}
                    />
                    <Route
                        path="/invoice_discount/:invoice_id"
                        exact
                        component={Invoice_discount}
                    />
                    <Route
                        path="/invoice_payment/:invoice_id"
                        exact
                        component={Invoice_payment}
                    />
                    <Route
                        path="/invoice/:order_code"
                        exact
                        component={Invoice}
                    />
                    <Route path="/addCompany" exact component={Add_company} />
                    <Route
                        path="/loginCompany"
                        exact
                        component={Company_login}
                    />
                    <Route
                        path="/orderConfirm"
                        exact
                        component={Order_confirm}
                    />
                    <Route path="/checkout" exact component={Checkout} />
                    <Route
                        path="/product/list"
                        exact
                        component={Product_list}
                    />
                    <Route path="/product/add" exact component={Add_Product} />
                    <Route
                        path="/product/sale"
                        exact
                        component={Sale_Product}
                    />
                    <Route path="/" exact component={Dashboard} />
                </Switch>
            </BrowserRouter>
        );
    }
}

if (document.getElementById("index")) {
    ReactDOM.render(
        <Provider store={store}>
            <Index />
        </Provider>,
        document.getElementById("index")
    );
}
