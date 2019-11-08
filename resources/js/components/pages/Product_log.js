import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";
import moment from "moment";
const initialState = {
    product_stock_log: []
};
class Product_Stock_Log extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/product_log/")
            .then(res => {
                this.setState({
                    product_stock_log: res.data
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
                Header: <div className="btn-danger">Product Key</div>,
                id: "in_o_code6",
                accessor: "p_unique_id",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Name</div>,
                id: "in_o_code",
                accessor: "p_name",
                filterable: true,

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Quantity Added</div>,
                id: "in_o_code1",
                accessor: "ps_up_qty",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Date</div>,
                id: "due",
                accessor: "ps_date",
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
                            <h1>
                                <i className="fa fa-history"></i> Product Stock History
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <ReactTable
                                        columns={columns}
                                        data={this.state.product_stock_log}
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

export default Product_Stock_Log;
