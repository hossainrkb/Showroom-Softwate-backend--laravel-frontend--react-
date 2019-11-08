import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { connect } from "react-redux";
import { productList } from "../store/actions/productAction";
import { saletypeList } from "../store/actions/saletypeAction";

import { Redirect } from "react-router-dom";
import Checkout from './Checkout'
//import { addOrder } from "../store/actions/orderAction";
import { addToCart ,updateCart,cartList} from "../store/actions/cartAction";
const initialState = {
    p_select: "",
    p_select_qty: "",
    CartSuccess: "",
    customer_contact: "",
    customer_id: "",
    customer_name: "",
    c_name: "",
    c_contact: "",
    st_select: "",
    type: "ggg",
    cart_total: "",
    count: 1,
    goCheckout: false
};
 var bro=""
class Sale_product extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.takeOrderValueFromInput = this.takeOrderValueFromInput.bind(this);
        this.holaOnSubmit = this.holaOnSubmit.bind(this);
        this.checkoutSubmit = this.checkoutSubmit.bind(this);
        this.myForm = React.createRef();
        this.myForm1 = React.createRef();
        this.state = initialState;
    }
    componentDidMount() {
        this.props.productList();
        this.props.cartList();
        this.props.saletypeList();
    }
    componentDidUpdate() {
      //  setTimeout(
        //    () => this.setState({ CartSuccess: this.props.addCart }),
        //    100
       // );
        //setTimeout(() => this.setState({ cart_total: this.props.cart_total }), 100);
    }
  

    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.value)
    }
    takeOrderValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    holaOnSubmit(e) {
        e.preventDefault();
        let { p_select, p_select_qty } = this.state;
         axios.post(`http://127.0.0.1:8000/api/cart/add`, {
             p_select,
             p_select_qty
         })
             .then(response => {
                this.setState({
                    CartSuccess:response.data
                });
             })
             .catch(error => {
                 console.log(error);
             });
       // this.props.addToCart({ p_select, p_select_qty }, this.props.history);
        //this.props.updateCart({ p_select, p_select_qty }, this.props.history);
        this.props.cartList();
        this.props.productList();
        this.myForm1.current.reset();
        this.setState({
            ...initialState
        });
    }
    //order submit
    checkoutSubmit(e) {
        let { c_name, c_contact, st_select } = this.state;

        e.preventDefault();
        axios
            .get(`http://127.0.0.1:8000/api/saleType/${st_select}`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    type: res.data
                });
                console.log(res.data);

                axios
                    .post(`http://127.0.0.1:8000/api/checkout`, {
                        c_name,
                        c_contact,
                        st_select
                    })
                    .then(response => {
                        this.setState({
                            customer_contact: response.data.c_contact,
                            customer_id: response.data.c_id,
                            customer_name: response.data.c_name,
                            goCheckout: true,
                            cart_total: this.props.cart_total
                        });
                        this.props.history.push({
                            pathname: "/checkout",
                            state: {
                                select_id: st_select,
                                type: res.data,
                                c_id: this.state.customer_id,
                                c_name: this.state.customer_name,
                                c_contact: this.state.customer_contact,
                                o_total: this.state.cart_total
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);
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
        //  if (this.state.goCheckout === true) {

        //  return <Redirect to="/checkout" name="rakib"  />;
        //  }
        var total = 0;
        return (
             <div class="wrapper">
                <Nav_Side />
            <div id="content">
                <Nav_Top />
                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fa fa-shopping-cart"></i> Shopping
                            Cart - Product Sale {this.state.cart_total}
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
                                <h3>Enter Product Information Below</h3>
                                {this.state.CartSuccess && (
                                    <p
                                        style={{ color: "white" }}
                                        className=" text-center"
                                    >
                                        {this.state.CartSuccess}
                                    </p>
                                )}
                            </div>
                            <div className="card-body">
                                <form
                                    ref={this.myForm1}
                                    onSubmit={this.holaOnSubmit}
                                >
                                    <table className="table table-bordered table-condensed table-hover table-striped">
                                        <tbody>
                                            <tr>
                                                <td className="text-right">
                                                    <b>Product List:</b>
                                                </td>
                                                <td colSpan="3">
                                                    <select
                                                        className="form-control"
                                                        name="p_select"
                                                        required=""
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    >
                                                        <option
                                                            key="x"
                                                            value=""
                                                        >
                                                            SELECT PRODUCT
                                                        </option>
                                                        {this.props.product_list.map(
                                                            product => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            product.p_id
                                                                        }
                                                                        value={
                                                                            product.p_id
                                                                        }
                                                                    >
                                                                        {
                                                                            product.p_name
                                                                        }{" "}
                                                                        (
                                                                        {
                                                                            product.p_qty
                                                                        }
                                                                        )
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">
                                                    <b>Quantity:</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        value={
                                                            this.state
                                                                .p_select_qty
                                                        }
                                                        className="form-control"
                                                        type="text"
                                                        name="p_select_qty"
                                                        placeholder="ENTER PRODUCT QUANTITY"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                                <td className="">
                                                    <button className="btn btn-info btn-md btn-block">
                                                        <i className="fas fa-check-square"></i>{" "}
                                                        ADD TO CART
                                                    </button>
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
                                                    bro = total;
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
                                                    <b>{bro} Tk</b>
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
                                <form
                                    ref={this.myForm}
                                    onSubmit={this.checkoutSubmit}
                                >
                                    <table className="table table-bordered table-condensed table-hover table-striped text-center">
                                        <thead>
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="text-left"
                                                >
                                                    <i className="fas fa-info-circle"></i>{" "}
                                                    Info &nbsp;
                                                    {this.state
                                                        .OrderSuccess && (
                                                        <span className=" text-center">
                                                            {
                                                                this.state
                                                                    .OrderSuccess
                                                            }
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td className="text-right">
                                                    <b>Sales Type:</b>
                                                </td>
                                                <td colSpan="">
                                                    <select
                                                        className="form-control"
                                                        name="st_select"
                                                        required
                                                        onChange={
                                                            this
                                                                .takeOrderValueFromInput
                                                        }
                                                    >
                                                        <option
                                                            key="x"
                                                            value=""
                                                        >
                                                            SELECT SALES TYPE
                                                        </option>
                                                        {this.props.saleType_list.map(
                                                            salesT => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            salesT.st_id
                                                                        }
                                                                        value={
                                                                            salesT.st_id
                                                                        }
                                                                    >
                                                                        {
                                                                            salesT.st_name
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </td>
                                                <td className="text-right">
                                                    <b> Contact:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="c_contact"
                                                        required
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
                                                        <button type="button" className="btn btn-danger btn-md float-right">
                                                            <i className="fas fa-check-square"></i>{" "}
                                                            CHECKOUT
                                                        </button>
                                                    ) : (
                                                        <button type="button" className="btn btn-danger btn-md float-right disabled ">
                                                            <i className="fas fa-check-square"></i>
                                                            CHECKOUT
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
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
    product_list: state.list,
    cart_list: state.cart_list,
    addCart: state.cart.cartSuccess,
    saleType_list: state.saleType_list,
    cart_total:bro
   // orderSuccess: state.add_order.orderSuccess
});
export default connect(
    mapStateToProps,
    { productList, addToCart, updateCart, cartList, saletypeList }
)(Sale_product);
