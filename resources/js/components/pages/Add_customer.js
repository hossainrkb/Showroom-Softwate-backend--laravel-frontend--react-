import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { connect } from "react-redux";
import { addProduct } from "../store/actions/productAction";
import Axios from "axios";
const initialState = {
    c_contact:"",
    c_name:"",
    success: "",
    customer_add: ""
};
class Add_Customer extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.holaOnSubmit = this.holaOnSubmit.bind(this);
        this.myForm = React.createRef();
        this.state = initialState;
    }
   
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    componentDidMount() {
    }
    holaOnSubmit(e) {
        e.preventDefault();
         var c_code = Math.floor(10000 + Math.random() * 90000);
        let {
           c_contact, c_name
        } = this.state;
        Axios.post(`http://127.0.0.1:8000/api/customer/add`, {
            c_contact,
            c_name,
            c_code
        })
            .then(response => {
                this.setState({
                    customer_add: response.data
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
        let {
          c_contact,
          c_name
        } = this.state;
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top />
                    <div className="row">
                        <div className="col-md-12">
                            <h2>
                                <i className="fas fa-plus-square"></i> Add
                                Customer
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
                                    <h3>Enter Customer Information Below</h3>
                                    {this.state.customer_add && (
                                        <p
                                            style={{ color: "white" }}
                                            className=" text-center"
                                        >
                                            {this.state.customer_add}
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
                                                        <b> Name</b>
                                                    </td>
                                                    <td>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="c_name"
                                                            value={c_name}
                                                            placeholder="Enter Name"
                                                            onChange={
                                                                this
                                                                    .takeValueFromInput
                                                            }
                                                        />
                                                    </td>
                                                    <td className="text-right">
                                                        <b>Contact</b>
                                                    </td>
                                                    <td colSpan="">
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="c_contact"
                                                            value={c_contact}
                                                            placeholder="Enter Contact Number"
                                                            onChange={
                                                                this
                                                                    .takeValueFromInput
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4">
                                                        <button className="btn btn-outline-info btn-md float-right">
                                                            <i className="fas fa-check-square"></i>{" "}
                                                            Add Customer
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
export default Add_Customer;
