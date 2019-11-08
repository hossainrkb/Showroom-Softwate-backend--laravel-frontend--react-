import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";
import moment from "moment";
const initialState = {
    daily_installment_report: []
};
class Daily_Installment_Report extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/saleType/dailyinstallment/report")
            .then(res => {
                this.setState({
                    daily_installment_report: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const columns = [
            {
                Header: <div className=" btn-danger">#SL</div>,
                Cell: row => {
                    return <div>{row.index + 1}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className="btn-danger">ORDER DATE</div>,
                id: "in_o_code6",
                accessor: "mnth_ins_date",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">NAME</div>,
                id: "in_o_code",
                accessor: "c_name",
                filterable: true,

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">CONTACT</div>,
                id: "in_o_code1",
                accessor: "c_contact",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">TOTAL SALE</div>,
                id: "amount_dis",
                accessor: d => {
                    var total = d.in_subtotal - d.in_discount;
                    return <div>{total}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">TOTAL PAID</div>,
                id: "amount_paid",
                accessor: d => {
                    return <div>{d.in_paid}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">TOTAL DUE</div>,
                id: "due",
                accessor: d => {
                    var total = d.in_discount + d.in_paid;
                    var due = d.in_subtotal - total;
                    return due;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">INSTALLMENT</div>,
                id: "in_o_code1",
                accessor: "mnth_ins_payment",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">ACTION</div>,
                id: "click",
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
                                        DAILY INSTALLMENT REPORT -{" "}
                                        {moment().format("YYYY-MM-DD")}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ReactTable
                                        columns={columns}
                                        data={
                                            this.state.daily_installment_report
                                        }
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

export default Daily_Installment_Report;
