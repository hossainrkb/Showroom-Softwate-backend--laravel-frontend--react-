import React, { Component } from "react";
var item = localStorage.getItem("token");
import logo from '../x.jpeg'
import { BrowserRouter, Route, Switch } from "react-router-dom";
const initialState = {
    my_invo: {},
    my_cus: {},
    put_dis: "",
    my_st: "",
    discount_success: "",
    my_com: {},
    my_crt: {}
};
class Invoice_print extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
    localStorage.setItem("invoice_id", this.props.match.params.invoice_id);
        axios
            .get(
                `http://127.0.0.1:8000/api/invoice/id/${this.props.match.params.invoice_id}`
            )
            .then(response => {
                this.setState({
                    my_invo: response.data
                });
                //customer
                axios
                    .get(
                        `http://127.0.0.1:8000/api/customer/${response.data.in_c_id}`
                    )
                    .then(cus => {
                        this.setState({
                            my_cus: cus.data
                        });
                    })
                    .catch(error => console.log(error));
                    //cart
                axios
                    .get(
                        `http://127.0.0.1:8000/api/order/cart/${response.data.in_o_code}`
                    )
                    .then(crt => {
                        this.setState({
                            my_crt: crt.data
                        });
                    })
                    .catch(error => console.log(error));
                    //sales tpe
                axios
                    .get(
                        `http://127.0.0.1:8000/api/saleType/${response.data.in_st_id}`
                    )
                    .then(st => {
                        this.setState({
                            my_st: st.data
                        });
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));

        //
    }
    render() {
        
        var total =
            this.state.my_invo.in_subtotal - this.state.my_invo.in_discount;
        return (
            <div className="" style={{ backgroundColor: "#FFF" }}>
                <div
                    className="invoice-header"
                    style={{
                        background: "#f7f7f7",
                        padding: "10px 20px 10px 20px",
                        borderBottom: "1px solid gray"
                    }}
                >
                    <div className="float-left site-logo">
                        <img
                            className="btn btn-default img img-circle"
                            src={logo}
                            style={{}}
                            width={100}
                        />
                    </div>
                    <div className="float-right site-address">
                        <h4 className="text-primary">RKB'S TERRITORY</h4>
                        <h6
                            style={{
                                fontFamily: "cursive"
                            }}
                        >
                            B block (1st Floor) Main
                            <br></br>Road,halishahor,Chittagong.
                            <br></br>Website :www.rakib.com
                            <br></br>E-mail : hossainrkb@yahoo.com
                            <br></br>Contact : +88 01923144496
                        </h6>
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="invoice-description">
                    <div
                        className="invoice-left-top float-left"
                        style={{
                            paddingLeft: "20px",
                            paddingTop: "20px",
                            borderLeft: "4px solid #ec5d01"
                        }}
                    >
                        <div className="row">
                            <div className="col-md-12">
                                Invoice To:{" "}
                                <span className="text-info">
                                    <b> {this.state.my_cus.c_unique_id} </b>
                                </span>
                                <br></br>
                                <br></br>
                                <span
                                    style={{
                                        fontFamily: "cursive"
                                    }}
                                >
                                    {this.state.my_cus.c_name}
                                    <br></br>
                                    +88 {this.state.my_cus.c_contact}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-right-top float-right">
                        <h3
                            style={{
                                paddingRight: "20px",
                                marginTop: "20px",
                                fontSize: "50px",
                                color: "#ec5d01!important",
                                fontFamily: "auto"
                            }}
                        >
                            Invoice NO # {this.state.my_invo.in_o_code}
                        </h3>
                        <h6>
                            {" "}
                            Date <i className="fas fa-calendar"></i>{" "}
                            {this.state.my_invo.in_date}
                        </h6>
                        <h6>
                            {" "}
                            Order Type :{" "}
                            <span className="text-danger">
                                {this.state.my_st}
                            </span>
                        </h6>
                    </div>
                    <div className="clearfix" />
                </div>
                <div className>
                    <h3>Products</h3>
                    <table className=" table ">
                        <thead>
                            <tr className="text-info">
                                <td>
                                    <b>#SL</b>{" "}
                                </td>
                                <td>
                                    <b>Product Name</b>
                                </td>
                                <td>
                                    <b>Quantity</b>
                                </td>
                                <td>
                                    <b>Unit Price</b>
                                </td>
                                <td>
                                    <b>Sub total Price</b>
                                </td>
                            </tr>
                        </thead>
                        {this.state.my_crt.length > 0 ? (
                            <tbody>
                                {this.state.my_crt.map((m_c, index) => {
                                    return (
                                        <tr key={m_c.cart_id}>
                                            <td>{index + 1}</td>
                                            <td>{m_c.p_name}</td>
                                            <td>{m_c.qty}</td>
                                            <td>{m_c.p_buy_price} Tk </td>
                                            <td>
                                                {m_c.qty * m_c.p_buy_price} Tk
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td>Cart is empty</td>
                                </tr>
                            </tbody>
                        )}
                        <tfoot>
                            <tr>
                                <td colSpan="4" className="text-right">
                                    <b>Sub Total:</b>
                                </td>
                                <td colSpan="" className="text-left">
                                    <b>{this.state.my_invo.in_subtotal} Tk</b>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right">
                                    <b>Discount:</b>
                                </td>
                                <td colSpan="" className="text-left">
                                    <b>{this.state.my_invo.in_discount} Tk</b>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right">
                                    <b>Total:</b>
                                </td>
                                <td colSpan="" className="text-left">
                                    <b>{total} Tk</b>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right">
                                    <b>Total Paid:</b>
                                </td>
                                <td colSpan="" className="text-left">
                                    <b>{this.state.my_invo.in_paid} Tk</b>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right">
                                    <b>Total Due:</b>
                                </td>
                                <td colSpan="" className="text-left">
                                    <b>
                                        {total - this.state.my_invo.in_paid} Tk
                                    </b>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <div
                        className="thanks mt-3"
                        style={{
                            marginTop: "20px",
                            color: "#ec5d01",
                            fontSize: "25px",
                            fontFamily: "serif",
                            fontWeight: "normal"
                        }}
                    >
                        <h4>Thanks For staying with RKB'S TERRITORY !</h4>
                    </div>
                    <div className="authority float-right mt-5">
                        <p>----------------------------------</p>
                        <h5 style={{ marginTop: "-10px", color: "#ec5d01" }}>
                            Authority Signeture:
                        </h5>
                    </div>
                    <div className="clearfix" />
                </div>
            </div>
        );
    }
}
export default Invoice_print;
