import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { NavLink } from "react-router-dom";
const initialState = {
    odr_cde: "",
    sl_typ: "",
    Order_Success: "",
    my_sale_type: "",
    od_success: "",
    order_date: "",
    my_cart: []
};

class Order_confirm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        this.setState({
            odr_cde: this.props.location.state.order_code,
            sl_typ: this.props.location.state.sale_type,
            order_date: this.props.location.state.order_date,
            od_success: this.props.location.state.success
        });
        console.log(this.props.location.state.success);
    axios
        .get(
            `http://127.0.0.1:8000/api/order/cart/${this.props.location.state.order_code}`
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                my_cart: response.data
            });
        })
        .catch(error => console.log(error));
  
    }
    
    render() {
        
        var total = 0;
        return (
             <div class="wrapper">
                        <Nav_Side />
            <div id="content">
                <Nav_Top />
                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-shopping-basket"></i> Order
                            Confirmation- {this.props.location.state.sale_type}
                        </h2>
                        <h3 className="text-success">
                            <i className="fas fa-info-circle"></i> Order ID -{" "}
                            <NavLink
                                
                                to={`/invoice/${this.props.location.state.order_code}`}
                            >
                                {this.props.location.state.order_code}
                            </NavLink>{" "}
                            , {this.props.location.state.success}
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-condensed text-center">
                                    <thead>
                                        <tr>
                                            <td
                                                colSpan="3"
                                                className="text-left"
                                            >
                                                <i className="fas fa-list"></i>{" "}
                                                Your Order Details
                                            </td>
                                            <td
                                                colSpan="2"
                                                className="text-left"
                                            >
                                                <i className="fas fa-calendar"></i>{" "}
                                                {
                                                    this.props.location.state
                                                        .order_date
                                                }
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

                                    {this.state.my_cart.length > 0 ? (
                                        <tbody>
                                            {this.state.my_cart.map(
                                                (m_c, index) => {
                                                    total =
                                                        total +
                                                        m_c.qty *
                                                            m_c.p_buy_price;
                                                    return (
                                                        <tr key={m_c.cart_id}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {m_c.p_name}
                                                            </td>
                                                            <td>{m_c.qty}</td>
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
export default Order_confirm;
