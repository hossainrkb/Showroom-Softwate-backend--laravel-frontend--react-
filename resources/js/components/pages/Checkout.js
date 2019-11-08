import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { connect } from "react-redux";
import {cartList } from "../store/actions/cartAction";
const initialState = {
    o_code: Math.floor(100000 + Math.random() * 900000),
    customer_id: "",
    selectType_id: "",
    order_total: "",
    Order_Success: ""
};
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.orderOnSubmit = this.orderOnSubmit.bind(this);
        this.myForm = React.createRef();
        this.state = initialState;
    }
    componentDidMount() {
    this.props.cartList();
     this.setState({
         customer_id: this.props.location.state.c_id,
         selectType_id: this.props.location.state.select_id,
         order_total: this.props.location.state.o_total
     });
     console.log(this.state.selectType_id);
    }
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //order submit
    orderOnSubmit(e) {
        e.preventDefault();
        var o_code = Math.floor(10000 + Math.random() * 90000);
          
        let {customer_id, selectType_id,order_total } = this.state;  
        axios
            .post(`http://127.0.0.1:8000/api/order/add`, {
                o_code,
                customer_id,
                selectType_id,
                order_total
            })
            .then(response => {
                console.log(response.data.o_sale_type_id);
                this.setState({
                    Order_Success: response.data.o_code
                });
                console.log(this.state.o_code);
                
                 console.log(this.state.o_code)
                this.props.cartList();
                 this.props.history.push({
                     pathname: "/orderConfirm",
                     state: {
                         order_code: response.data.o_code,
                         order_date: response.data.o_date,
                         sale_type: this.props.location.state.type,
                         success: "Order Placed Successful"
                     }
                 });
            })
            .catch(error => {
                console.log(error);
            });
        this.myForm.current.reset();
        this.setState({
            ...initialState
        });
    }

    render() {
         let { customer_id, selectType_id, order_total } = this.state;  
        var total = 0;
        return (
             <div class="wrapper">
                <Nav_Side />
            <div id="content">
                <Nav_Top />
                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            {order_total}
                            <i className="fas fa-shopping-basket"></i> CheckOut
                            - Product Sale
                        </h2>
                    </div>
                </div>
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
                                    Order Review (
                                    {this.props.location.state.type})
                                </h3>
                                {this.state.Order_Success && (
                                    <p
                                        style={{ color: "white" }}
                                        className=" text-center"
                                    >
                                        {this.state.Order_Success}
                                    </p>
                                )}
                            </div>
                            <div className="card-body">
                                <form
                                    ref={this.myForm}
                                    onSubmit={this.orderOnSubmit}
                                >
                                    <table className="table table-bordered table-condensed table-hover table-striped text-center">
                                        <thead>
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="text-left"
                                                >
                                                    <i className="fas fa-info-circle"></i>{" "}
                                                    Customer Info
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td className="text-right">
                                                    <input
                                                        className="form-control"
                                                        type="hidden"
                                                        value={
                                                            this.state.o_code
                                                        }
                                                        name="o_code"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                    <input
                                                        className="form-control"
                                                        type="hidden"
                                                        value={
                                                           customer_id
                                                        }
                                                        name="customer_id"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                    <input
                                                        className="form-control"
                                                        type="hidden"
                                                        value={
                                                           selectType_id
                                                        }
                                                        name="selectType_id"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                    <input
                                                        className="form-control"
                                                        type="hidden"
                                                        value={
                                                            order_total
                                                        }
                                                        name="order_total"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                    <b>Customer's Name:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="c_name"
                                                        value={
                                                            this.props.location
                                                                .state.c_name
                                                        }
                                                        placeholder="ENTER NAME"
                                                    />
                                                </td>
                                                <td className="text-right">
                                                    <b> Contact:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="c_contact"
                                                        readOnly
                                                        value={
                                                            this.props.location
                                                                .state.c_contact
                                                        }
                                                        placeholder="ENTER CONTACT NUMBER"
                                                        onChange={
                                                            this
                                                                .takeOrderValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4">
                                                    {this.props.cart_list
                                                        .length > 0 ? (
                                                        <button className="btn btn-danger btn-md float-right">
                                                            <i className="fas fa-check-square"></i>{" "}
                                                            CONFIRM ORDER
                                                        </button>
                                                    ) : (
                                                        <button type="button" className="btn btn-danger btn-md float-right disabled">
                                                            <i className="fas fa-check-square"></i>{" "}
                                                            CONFIRM ORDER
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                                <table className="table table-bordered table-condensed table-hover table-striped text-center">
                                    <thead>
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-left"
                                            >
                                                <i className="fas fa-cart-arrow-down"></i>{" "}
                                                Your Shopping Cart
                                            </td>
                                        </tr>
                                        <tr>
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

                                    {this.props.cart_list.length > 0 ? (
                                        <tbody>
                                            {this.props.cart_list.map(
                                                (c_list, index) => {
                                                    total =
                                                        total +
                                                        c_list.qty *
                                                            c_list.p_buy_price;
                                                    return (
                                                        <tr
                                                            key={c_list.cart_id}
                                                        >
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {c_list.p_name}
                                                            </td>
                                                            <td>
                                                                {c_list.qty}
                                                            </td>
                                                            <td>
                                                                {
                                                                    c_list.p_buy_price
                                                                }
                                                            </td>
                                                            <td>
                                                                {c_list.qty *
                                                                    c_list.p_buy_price}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    className="text-right"
                                                >
                                                    <b>Total Amount:</b>
                                                </td>
                                                <td
                                                    colSpan=""
                                                    className="text-center"
                                                >
                                                    <b>{total} Tk</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td>Cart is empty</td>
                                            </tr>
                                        </tbody>
                                    )}
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
const mapStateToProps = state => ({
    cart_list: state.cart_list,
    // orderSuccess: state.add_order.orderSuccess
});
export default connect(
    mapStateToProps,
    { cartList }
)(Checkout);
