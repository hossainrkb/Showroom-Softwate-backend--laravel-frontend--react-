import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { connect } from "react-redux";
import { addProduct } from "../store/actions/productAction";
import Axios from 'axios'
const initialState = {
    p_code: Math.floor(10000 + Math.random() * 90000),
    p_name: "",
    p_qty: "",
    p_b_price: "",
    p_s_price: "",
    p_i: "",
    p_w: "",
    success: "",
    product_add:""
};
class Add_product extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.holaOnSubmit = this.holaOnSubmit.bind(this);
        this.myForm = React.createRef();
        this.state = initialState;
    }
    componentDidUpdate() {
        setTimeout(() => this.setState({ success: this.props.pro }), 20);
    }
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount(){
            setTimeout(
                () =>
                    this.setState({
                        p_code: Math.floor(10000 + Math.random() * 90000)
                    }),
                100
            );
    }
    holaOnSubmit(e) {
        e.preventDefault();
        let {
            p_code,
            p_name,
            p_qty,
            p_b_price,
            p_s_price,
            p_i,
            p_w
        } = this.state;
        Axios.post(`http://127.0.0.1:8000/api/product/add`, {
            p_code,
            p_name,
            p_qty,
            p_b_price,
            p_s_price,
            p_i,
            p_w
        })
            .then(response => {
               this.setState({
                   product_add: response.data
               });
            })
            .catch(error => {
                console.log(error)
            });
        
        this.myForm.current.reset();
        this.setState({
            ...initialState,
           
        });
         setTimeout(
             () =>
                 this.setState({
                     p_code: Math.floor(10000 + Math.random() * 90000)
                 }),
             100
         );

    }

    render() {
        let {
            p_code,
            p_name,
            p_qty,
            p_b_price,
            p_s_price,
            p_i,
            p_w
        } = this.state;
        return (
             <div class="wrapper">
                <Nav_Side />
            <div id="content">
                <Nav_Top />
                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-plus-square"></i> Add Product
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
                                {this.state.product_add && (
                                    <p
                                        style={{ color: "white" }}
                                        className=" text-center"
                                    >
                                        {this.state.product_add}
                                    </p>
                                )}
                            </div>
                            <div className="card-body">
                                <form
                                    ref={this.myForm}
                                    onSubmit={this.holaOnSubmit}
                                >
                                    <table className="table table-bordered table-condensed table-hover table-striped">
                                        <tbody>
                                            <tr>
                                                <td className="text-right">
                                                    <b>Name</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        className="form-control"
                                                        type="hidden"
                                                        value={p_code}
                                                        name="p_code"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                     
                                                    />
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="p_name"
                                                        value={p_name}
                                                        placeholder="Enter Product Name"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                                <td className="text-right">
                                                    <b>Quantity</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="p_qty"
                                                        value={p_qty}
                                                        placeholder="Enter Quantity"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">
                                                    <b>Buy Price</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="p_b_price"
                                                        value={p_b_price}
                                                        placeholder="Enter Buy Price"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                                <td className="text-right">
                                                    <b>Sell Price</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="p_s_price"
                                                        value={p_s_price}
                                                        placeholder="Enter Sell Price"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">
                                                    <b>Instalment</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="p_i"
                                                        value={p_i}
                                                        placeholder="Enter Instalment Price"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                                <td className="text-right">
                                                    <b>Wholesale</b>
                                                </td>
                                                <td colSpan="2">
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="p_w"
                                                        value={p_w}
                                                        placeholder="Enter Wholesale Price"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="6">
                                                    <button className="btn btn-outline-info btn-md float-right">
                                                        <i className="fas fa-check-square"></i>{" "}
                                                        ADD PRODUCT
                                                    </button>
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
  //  pro: state.product.success
});
export default (Add_product);
