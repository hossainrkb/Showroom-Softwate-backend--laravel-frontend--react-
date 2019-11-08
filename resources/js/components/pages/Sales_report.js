import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
const initialState = {
    sales_r: []
};
class Sales_Report extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
           axios.get("http://127.0.0.1:8000/api/saleType/list")
               .then(res => {
                  this.setState({
                      sales_r:res.data
                  })
               })
               .catch(error => {
                  console.log(error)
               });
    }

    render() {
        var total_due = 0
        var total_order = 0
        var total_dis = 0
        var total_paid = 0
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top />
                    <h2>Sales report</h2>
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
                                    <h3>TOTAL SALES REPORT</h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered table-striped table-hover table-condensed">
                                        <thead>
                                            <tr
                                                style={{
                                                    color: "white",
                                                    background: "#7386D5"
                                                }}
                                            >
                                                <td>Sales Type</td>
                                                <td className="text-center">
                                                    Total Invoice
                                                </td>
                                                <td className="text-right">
                                                    Total Order
                                                </td>
                                                <td className="text-right">
                                                    Total Discount
                                                </td>
                                                <td className="text-right">
                                                    Total Paid
                                                </td>
                                                <td className="text-right">
                                                    Total Due
                                                </td>
                                            </tr>
                                        </thead>
                                        {this.state.sales_r.length > 0 ? (
                                            <tbody>
                                                {this.state.sales_r.map(
                                                    (s_list, index) => {
                                                        total_due =
                                                            total_due +
                                                            s_list.st_total_order -
                                                            s_list.st_total_discount -
                                                            s_list.st_total_paid;
                                                        total_order =
                                                            total_order +
                                                            s_list.st_total_order;
                                                        total_paid =
                                                            total_paid +
                                                            s_list.st_total_paid;
                                                        total_dis =
                                                            total_dis +
                                                            s_list.st_total_discount;
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {
                                                                        s_list.st_name
                                                                    }
                                                                </td>
                                                                <td className="text-center">
                                                                    {
                                                                        s_list.st_total_invoice
                                                                    }
                                                                </td>
                                                                <td className="text-right">
                                                                    {
                                                                        s_list.st_total_order
                                                                    }
                                                                </td>
                                                                <td className="text-right">
                                                                    {
                                                                        s_list.st_total_discount
                                                                    }
                                                                </td>
                                                                <td className="text-right">
                                                                    {
                                                                        s_list.st_total_paid
                                                                    }
                                                                </td>
                                                                <td className="text-right">
                                                                    {s_list.st_total_order -
                                                                        s_list.st_total_discount -
                                                                        s_list.st_total_paid}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        ) : (
                                            <tbody>
                                                <tr>
                                                    <td>empty</td>
                                                </tr>
                                            </tbody>
                                        )}
                                    </table>
                                    <table className="table-condensed table table-bordered">
                                        <tfoot>
                                            <tr className="text-center">
                                                <td colSpan="">
                                                    <h3>Total Order</h3>
                                                    <h5>{total_order}.00</h5>
                                                </td>
                                                <td colSpan="">
                                                    <h3>Total Paid</h3>
                                                    <h5>{total_paid}.00</h5>
                                                </td>
                                                <td colSpan="">
                                                    <h3>Total Discount</h3>
                                                    <h5>{total_dis}.00</h5>
                                                </td>
                                                <td colSpan="">
                                                    <h3>Total Due</h3>
                                                    <h5>{total_due}.00</h5>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sales_Report;
