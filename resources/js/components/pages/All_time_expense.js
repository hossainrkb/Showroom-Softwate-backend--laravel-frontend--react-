import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";
import moment from "moment";
const initialState = {
    allTime_expense: [],
    allTime_expense_invo: []
};
class AllTime_Expense extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/exp/history/allTime")
            .then(res => {
                this.setState({
                    allTime_expense: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        //invoice
        axios
            .get("http://127.0.0.1:8000/api/exp/history/allTime/invoice")
            .then(res => {
                this.setState({
                    allTime_expense_invo: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const columns = [
            {
                Header: "#SL",
                Cell: row => {
                    return <div>{row.index + 1}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Expense Type",
                id: "in_o_code",
                accessor: "exp_name",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "AMOUNT",
                id: "amount",
                accessor: d => {
                    return <div>{d.exp_h_amount}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Date",
                id: "amount_dis",
                accessor: "exp_h_date",
                filterable: true,
                style: {
                    textAlign: "center"
                }
            }
        ];
        const columnsOne = [
            {
                Header: "#SL",
                Cell: row => {
                    return <div>{row.index + 1}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Expense Type",
                id: "in_o_code",
                accessor: "exp_name",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "AMOUNT",
                id: "amount",
                accessor: d => {
                    return <div>{d.exp_h_amount}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Date",
                id: "amount_dis",
                accessor: "exp_h_date"
                ,
                filterable: true,
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Order ID",
                id: "amountf_dis",
                accessor: d => {
                    return (
                        <NavLink
                            className="btn btn-info badge"
                            to={`/invoice/${d.in_o_code}`}
                        >
                            <i className="fas fa-eye"></i> {d.in_o_code}
                        </NavLink>
                    );
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Customer Contact",
                id: "amountf_disd",
                accessor:"c_contact",
                filterable: true,
                style: {
                    textAlign: "center"
                }
            }
        ];
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div
                                    className="card-header text-center"
                                    style={{
                                        color: "white",
                                        background: "#7386D5"
                                    }}
                                >
                                    <h3>
                                        ALL TIME EXPENSE -{" "}
                                        {moment().format("YYYY-MM-DD")}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ReactTable
                                        columns={columns}
                                        data={this.state.allTime_expense}
                                        defaultPageSize={5}
                                        noDataText={"No data found"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div
                                    className="card-header text-center"
                                    style={{
                                        color: "white",
                                        background: "#7386D5"
                                    }}
                                >
                                    <h3>
                                        ALL TIME EXPENSE INVOICE -{" "}
                                        {moment().format("YYYY-MM-DD")}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ReactTable
                                        columns={columnsOne}
                                        data={this.state.allTime_expense_invo}
                                        defaultPageSize={5}
                                        noDataText={"No data found"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllTime_Expense;
