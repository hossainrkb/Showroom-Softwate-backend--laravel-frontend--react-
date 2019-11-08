import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { NavLink } from "react-router-dom";
var item = localStorage.getItem("token");
const initialState = {
    my_invo: {},
    my_cus: {},
    make_pay:"",
    payment_success:"",
    my_com:{}
};
var check;
class Invoice_Payment extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.holaOnSubmit = this.holaOnSubmit.bind(this);
        this.myForm = React.createRef();
        this.state = initialState;
    }
    componentDidMount() {
         axios
             .get(
                 `http://127.0.0.1:8000/api/company/${item}`
             )
             .then(response => {
                 this.setState({
                     my_com: response.data
                 });
             })
             .catch(error => console.log(error));
        //
        axios
            .get(
                `http://127.0.0.1:8000/api/invoice/id/${this.props.match.params.invoice_id}`
            )
            .then(response => {
                this.setState({
                    my_invo: response.data
                });
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
            })
            .catch(error => console.log(error));

        //
    }

    takeValueFromInput(e) {
        this.setState({
            [e.target.name]:e.target.value
        });
        console.log(e.target.value)
    }
    holaOnSubmit(e) {
        e.preventDefault();
        let in_id = this.props.match.params.invoice_id;
        let make_pay = this.state.make_pay;
        let comp_id =  this.state.my_com.comp_id;
        let in_c_id = this.state.my_invo.in_c_id;
        let in_s_type = this.state.my_invo.in_st_id;
       if(make_pay > check){
           this.setState({
               payment_success:"Your total is less than u pay !"
           })
       }
       else{
            axios
                .post(`http://127.0.0.1:8000/api/invoice/pay`, {
                    in_id,
                    make_pay,
                    comp_id,
                    in_c_id,
                    in_s_type
                })
                .then(response => {
                    this.setState({
                        payment_success: response.data
                    });
                    //again call
                    axios
                        .get(
                            `http://127.0.0.1:8000/api/invoice/id/${this.props.match.params.invoice_id}`
                        )
                        .then(response => {
                            this.setState({
                                my_invo: response.data
                            });
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
                        })
                        .catch(error => console.log(error));
                });
            axios
                .get(`http://127.0.0.1:8000/api/company/${item}`)
                .then(response => {
                    this.setState({
                        my_com: response.data
                    });
                })
                .catch(error => console.log(error));
            this.myForm.current.reset();
            this.setState({
                ...initialState
            });
       }

    }

    render() {
        var total =
            this.state.my_invo.in_subtotal - this.state.my_invo.in_discount;
            check = total
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top add_payment={this.state.my_com.comp_amount} />
                    <div className="row">
                        <div className="col-md-12">
                            <h2>
                                <i className="fas fa-plus-square"></i> Make
                                Payment {this.props.match.params.invoice_id}
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
                                    <h3>Enter Payment Information Below</h3>
                                    {this.state.payment_success && (
                                        <p
                                            style={{ color: "white" }}
                                            className=" text-center"
                                        >
                                            {this.state.payment_success}{" "}
                                            <NavLink
                                                className="btn badge btn-success ml-2"
                                                to={`/invoice/${this.state.my_invo.in_o_code}`}
                                            >
                                                <i className="fa fa-plus"></i>{" "}
                                                Check invoice
                                            </NavLink>
                                        </p>
                                    )}
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <form
                                                ref={this.myForm}
                                                onSubmit={this.holaOnSubmit}
                                            >
                                                <table className="table table-condensed table-hover table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                colSpan="2"
                                                                className="text-center"
                                                                style={{
                                                                    color:
                                                                        "white",
                                                                    background:
                                                                        "#7386D5"
                                                                }}
                                                            >
                                                                Payment Details
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-right">
                                                                <b>Order ID:</b>
                                                            </td>
                                                            <td
                                                                colSpan=""
                                                                className=""
                                                            >
                                                                {
                                                                    this.state
                                                                        .my_invo
                                                                        .in_o_code
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-right">
                                                                <b>
                                                                    Customer ID:
                                                                </b>
                                                            </td>
                                                            <td
                                                                colSpan=""
                                                                className=""
                                                            >
                                                                {
                                                                    this.state
                                                                        .my_cus
                                                                        .c_unique_id
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-right">
                                                                <b>
                                                                    PAYMENT
                                                                    AMOUNT:
                                                                </b>
                                                            </td>
                                                            <td colSpan="">
                                                                <input
                                                                    className="form-control"
                                                                    required
                                                                    min="1"
                                                                    type="text"
                                                                    name="make_pay"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .make_pay
                                                                    }
                                                                    placeholder="ENTER PAYMENT"
                                                                    onChange={
                                                                        this
                                                                            .takeValueFromInput
                                                                    }
                                                                />
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td colSpan="2">
                                                                <button className="btn btn-info btn-md float-right">
                                                                    <i className="fas fa-check-square"></i>{" "}
                                                                    MAKE PAYMENT
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                        <div className="col-md-4">
                                            <table className="table table-condensed table-hover table-striped">
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            colSpan="2"
                                                            className="text-center"
                                                            style={{
                                                                color: "white",
                                                                background:
                                                                    "#7386D5"
                                                            }}
                                                        >
                                                            Invoice Summary
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colSpan=""
                                                            className="text-right"
                                                        >
                                                            Sub Total:
                                                        </td>
                                                        <td
                                                            colSpan=""
                                                            className="text-left"
                                                        >
                                                            {
                                                                this.state
                                                                    .my_invo
                                                                    .in_subtotal
                                                            }{" "}
                                                            Tk
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colSpan=""
                                                            className="text-right"
                                                        >
                                                            Discount:
                                                        </td>
                                                        <td
                                                            colSpan=""
                                                            className="text-left"
                                                        >
                                                            {
                                                                this.state
                                                                    .my_invo
                                                                    .in_discount
                                                            }{" "}
                                                            Tk
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colSpan=""
                                                            className="text-right"
                                                        >
                                                            Total:
                                                        </td>
                                                        <td
                                                            colSpan=""
                                                            className="text-left"
                                                        >
                                                            {check} Tk
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colSpan=""
                                                            className="text-right"
                                                        >
                                                            Total Paid:
                                                        </td>
                                                        <td
                                                            colSpan=""
                                                            className="text-left"
                                                        >
                                                            {
                                                                this.state
                                                                    .my_invo
                                                                    .in_paid
                                                            }{" "}
                                                            Tk
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            colSpan=""
                                                            className="text-right"
                                                        >
                                                            Total Due:
                                                        </td>
                                                        <td
                                                            colSpan=""
                                                            className="text-left"
                                                        >
                                                            {total -
                                                                this.state
                                                                    .my_invo
                                                                    .in_paid}{" "}
                                                            Tk
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Invoice_Payment;
