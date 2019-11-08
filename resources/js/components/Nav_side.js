import React, { Component } from 'react';
import { NavLink,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ClearAddProduct } from "./store/actions/productAction";
class Nav_side extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3 className="text-center">ShowRoom software</h3>
            </div>
            <ul className="list-unstyled components">
                <li>
                    <NavLink style={{ fontSize: "17px" }} to="/" exact>
                        Dashboard
                    </NavLink>
                </li>
                <li className="">
                    <a
                        href="#homeSubmenu2"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggle"
                        style={{ fontSize: "17px" }}
                    >
                        Sales Management
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu2">
                        <li>
                            <NavLink to="/product/sale" exact>
                                New Sale
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/salesReport" exact>
                                Sales Report
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/todaysSalesHistory" exact>
                                Today's Sales History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/allTimesSalesHistory" exact>
                                All Time's Sales History
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="">
                    <a
                        href="#homeSubmenu4"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggle"
                        style={{ fontSize: "17px" }}
                    >
                        Sales Report
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu4">
                        <li>
                            <NavLink to="/regularSales" exact>
                                Regular Report
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/wholeSales" exact>
                                WholeSales Report
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/installmentSales" exact>
                                Installment Report
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dailyInstallmentSales" exact>
                                Daily Installment Report
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="">
                    <a
                        href="#homeSubmenu1"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggle"
                        style={{ fontSize: "17px" }}
                    >
                        Product Management
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu1">
                        <li>
                            <NavLink to="/product/add" exact>
                                Add Product
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/product/list"
                                onClick={() => this.props.ClearAddProduct()}
                                exact
                            >
                                Product List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/product/log" exact>
                                Product Stock History
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="">
                    <a
                        href="#homeSubmenu77"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggle"
                        style={{ fontSize: "17px" }}
                    >
                        Account Management
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu77">
                        <li>
                            <NavLink to="/todaysExpense" exact>
                                Today's Expense
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/todaysDeposit" exact>
                                Today's Deposit
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/allTimeExpense" exact>
                                AllTime Expense History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/allTimeDeposit" exact>
                                AllTime Deposit History
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="">
                    <a
                        href="#homeSubmenu787"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggle"
                        style={{ fontSize: "17px" }}
                    >
                        Customer Management
                    </a>
                    <ul className="collapse list-unstyled" id="homeSubmenu787">
                        <li>
                            <NavLink to="/addCustomer" exact>
                                Add Customer
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/todaysDeposit" exact>
                                Customer List
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
  }
}
export default connect(null,{ClearAddProduct})(withRouter(Nav_side));