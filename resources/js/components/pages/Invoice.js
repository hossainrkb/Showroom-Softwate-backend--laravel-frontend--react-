import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import {NavLink} from 'react-router-dom'

const initialState = {
    odr_cde: "",
    sl_typ: "",
    Order_Success: "",
    Set_ins: "",
    my_sale_type: "",
    od_success: "",
    order_date: "",
    my_cart: [],
    my_invo: {},
    my_cus: {},
    my_mnth_ins: {},
    my_st: "",
    payment_ins: ""
};
class Invoice_Page extends Component {
    constructor(props) {
        super(props);
         this.takeValueFromInput = this.takeValueFromInput.bind(this);
         this.installmentOnSubmit = this.installmentOnSubmit.bind(this);
         this.myForm = React.createRef();
        this.state = initialState;
    }
    componentDidMount() {
        axios
            .get(
                `http://127.0.0.1:8000/api/order/cart/${this.props.match.params.order_code}`
            )
            .then(response => {
              
                this.setState({
                    my_cart: response.data
                });
            })
            .catch(error => console.log(error));
        //
        axios
            .get(
                `http://127.0.0.1:8000/api/invoice/${this.props.match.params.order_code}`
            )
            .then(res => {
                             this.setState({
                                 my_invo: res.data
                             });
                             axios
                                 .get(
                                     `http://127.0.0.1:8000/api/customer/${res.data.in_c_id}`
                                 )
                                 .then(cus => {
                                     this.setState({
                                         my_cus: cus.data
                                     });
                                 })
                                 .catch(error => console.log(error));
                             //sales tpe
                             axios
                                 .get(
                                     `http://127.0.0.1:8000/api/saleType/${res.data.in_st_id}`
                                 )
                                 .then(st => {
                                     this.setState({
                                         my_st: st.data
                                     });
                                 })
                                 .catch(error => console.log(error));
                             //check installment
                             axios
                                 .get(
                                     `http://127.0.0.1:8000/api/set_mnthly_ins/get/${res.data.in_id}`
                                 )
                                 .then(ins => {
                                     this.setState({
                                         my_mnth_ins: ins.data
                                     });
                                     console.log(ins.data);
                                 })
                                 .catch(error => console.log(error));
                         })
            .catch(error => console.log(error));
       

    }
    //installment add
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //order submit
    installmentOnSubmit(e) {
    e.preventDefault();
    var mnth_ins_code = Math.floor(
        10000 + Math.random() * 90000
    );
    var invo_id = this.state.my_invo.in_id;
    var payment = this.state.payment_ins;
    var holaTotal =
        this.state.my_invo.in_subtotal -
        this.state.my_invo.in_discount;
    axios
        .post(
            `http://127.0.0.1:8000/api/set_mnthly_ins`,
            {
                mnth_ins_code,
                invo_id,
                payment,
                holaTotal
            }
        )
        .then(response => {
            this.setState({
                Set_ins: response.data
            });
        })
        .catch(error => {
            console.log(error);
        });
    this.myForm.current.reset();
    this.setState({
        payment_ins: ""
    });
    //check installment
    axios
        .get(`http://127.0.0.1:8000/api/set_mnthly_ins/get/${invo_id}`)
        .then(ins => {
            this.setState({
                my_mnth_ins: ins.data
            });
            console.log(ins.data);
        })
        .catch(error => console.log(error));
}
    render() {
        var total =
            this.state.my_invo.in_subtotal - this.state.my_invo.in_discount;
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top />
                    <div className="row">
                        <div className="col-md-12">
                            <h2>
                                <i className="fas fa-list"></i> Order Details -{" "}
                                <span className="text-primary">
                                    Your Invoice
                                </span>
                                <span className="float-right">
                                    Order ID #{" "}
                                    {this.props.match.params.order_code}{" "}
                                </span>
                            </h2>
                            {this.state.my_invo.in_st_id === 3 ? (
                                
                                this.state.my_mnth_ins.mnth_ins_status !== 2 ? (
                                this.state.my_invo.in_st_id === 3 &&
                                this.state.my_mnth_ins.mnth_ins_invo_id !==
                                    this.state.my_invo.in_id ? (
                                    <form
                                        ref={this.myForm}
                                        onSubmit={this.installmentOnSubmit}
                                    >
                                        <table className="table table-bordered table-condensed table-hover table-striped text-center">
                                            <tbody>
                                                <tr>
                                                    <td colSpan="3">
                                                        {this.state.Set_ins && (
                                                            <span className=" text-center">
                                                                {
                                                                    this.state
                                                                        .Set_ins
                                                                }
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-right">
                                                        <b>
                                                            Set Your Installment
                                                            Fee:
                                                        </b>
                                                    </td>
                                                    <td colSpan="">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="payment_ins"
                                                            value={
                                                                this.state
                                                                    .payment_ins
                                                            }
                                                            placeholder="ENTER INSTALLMENT FEE..."
                                                            onChange={
                                                                this
                                                                    .takeValueFromInput
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-info btn-md float-left">
                                                            <i className="fas fa-check-square"></i>{" "}
                                                            SET
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                ) : (
                                    <h3 className="text-center">
                                        Your Installment Fee :{" "}
                                        {
                                            this.state.my_mnth_ins
                                                .mnth_ins_payment
                                        }
                                        .00 Tk
                                    </h3>
                                )
                            ) : (
                                <h3 className="text-center">
                                    Your Installment has Finished
                                    
                                </h3>
                            )):""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="float-left">
                                                <span>
                                                    Date{" "}
                                                    <i className="fas fa-calendar"></i>{" "}
                                                    {this.state.my_invo.in_date}
                                                </span>
                                                <span className="badge btn-primary ml-2">
                                                    {this.state.my_st}
                                                </span>
                                            </div>
                                            <div className="float-right">
                                                <NavLink
                                                    className="btn badge btn-outline-primary mr-2"
                                                    to={`/invoice_payment/${this.state.my_invo.in_id}`}
                                                >
                                                    <i className="fa fa-plus"></i>{" "}
                                                    Payment
                                                </NavLink>
                                                <NavLink
                                                    className="btn badge btn-outline-danger mr-2"
                                                    to={`/invoice_discount/${this.state.my_invo.in_id}`}
                                                >
                                                    <i className="fa fa-minus"></i>{" "}
                                                    Discount
                                                </NavLink>
                                                <NavLink
                                                    className="btn badge btn-outline-success mr-2"
                                                    to={`/invoice_print/${this.state.my_invo.in_id}`}
                                                >
                                                    <i className="fa fa-print"></i>{" "}
                                                    Print
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-6">
                                            Invoice To:{" "}
                                            <span className="btn btn-info badge">
                                                {this.state.my_cus.c_unique_id}{" "}
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
                                                +88{" "}
                                                {this.state.my_cus.c_contact}
                                            </span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <h4 className="text-primary">
                                                RKB'S TERRITORY
                                            </h4>
                                            <h6
                                                style={{
                                                    fontFamily: "cursive"
                                                }}
                                            >
                                                High School Market (1st Floor)
                                                Main
                                                <br></br>Road,Sonagazi,Feni.
                                                <br></br>Website
                                                :www.patoaryelectronics.com
                                                <br></br>E-mail :
                                                info@patoaryelectronics.com
                                                <br></br>Contact : +88
                                                01771313313
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table className="table table-condensed text-center">
                                        <thead>
                                            <tr
                                                style={{
                                                    color: "white",
                                                    background: "#7386D5",
                                                    fontFamily: "cursive"
                                                }}
                                            >
                                                <td className="">
                                                    <b>#SL</b>
                                                </td>
                                                <td className="">
                                                    <b>Product Name</b>
                                                </td>
                                                <td className="">
                                                    <b>Quantity</b>
                                                </td>
                                                <td className="">
                                                    <b>Unit Price</b>
                                                </td>
                                                <td className="">
                                                    <b>Total Price</b>
                                                </td>
                                            </tr>
                                        </thead>

                                        {this.state.my_cart.length > 0 ? (
                                            <tbody>
                                                {this.state.my_cart.map(
                                                    (m_c, index) => {
                                                        return (
                                                            <tr
                                                                key={
                                                                    m_c.cart_id
                                                                }
                                                            >
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {m_c.p_name}
                                                                </td>
                                                                <td>
                                                                    {m_c.qty}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        m_c.p_buy_price
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {m_c.qty *
                                                                        m_c.p_buy_price}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
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
                                                <td
                                                    colSpan="4"
                                                    className="text-right"
                                                >
                                                    <b>Sub Total:</b>
                                                </td>
                                                <td
                                                    colSpan=""
                                                    className="text-left"
                                                >
                                                    <b>
                                                        {
                                                            this.state.my_invo
                                                                .in_subtotal
                                                        }{" "}
                                                        Tk
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="text-right"
                                                >
                                                    <b>Discount:</b>
                                                </td>
                                                <td
                                                    colSpan=""
                                                    className="text-left"
                                                >
                                                    <b>
                                                        {
                                                            this.state.my_invo
                                                                .in_discount
                                                        }{" "}
                                                        Tk
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="text-right"
                                                >
                                                    <b>Total:</b>
                                                </td>
                                                <td
                                                    colSpan=""
                                                    className="text-left"
                                                >
                                                    <b>{total} Tk</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="text-right"
                                                >
                                                    <b>Total Paid:</b>
                                                </td>
                                                <td
                                                    colSpan=""
                                                    className="text-left"
                                                >
                                                    <b>
                                                        {
                                                            this.state.my_invo
                                                                .in_paid
                                                        }{" "}
                                                        Tk
                                                    </b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="text-right"
                                                >
                                                    <b>Total Due:</b>
                                                </td>
                                                <td
                                                    colSpan=""
                                                    className="text-left"
                                                >
                                                    <b>
                                                        {total -
                                                            this.state.my_invo
                                                                .in_paid}{" "}
                                                        Tk
                                                    </b>
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
export default Invoice_Page;
