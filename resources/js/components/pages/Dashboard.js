import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import { isObject } from "util";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import "react-table/react-table.css";
var item = localStorage.getItem("token");


const initialState = {
    cus_contact: "",
    order_id: "",
    get_cus: {},
    not_found: "",
    not_obj_data: "",
    not_order_obj_data: "",
    not_order_found: "",
    get_order: {},
    dep_type: [],
    dep_amount: "",
    dep_select_type: "",
    dep_his: [],
    exp_type: [],
    exp_amount: "",
    exp_select_type: "",
    exp_his: [],
    modalIsOpenExp:false,
    modalIsOpen:false,
    my_com:{}
};
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.searchCustomer = this.searchCustomer.bind(this);
        this.myForm = React.createRef();
        this.takeOrderValueFromInput = this.takeOrderValueFromInput.bind(this);
        this.searchOrder = this.searchOrder.bind(this);
        this.myForm1 = React.createRef();
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.takeDepValueFromInput = this.takeDepValueFromInput.bind(this);
        this.depAdd = this.depAdd.bind(this);
        this.myDepForm = React.createRef();
        this.openModalExp = this.openModalExp.bind(this);
        this.afterOpenModalExp = this.afterOpenModalExp.bind(this);
        this.closeModalExp = this.closeModalExp.bind(this);
        this.takeExpValueFromInput = this.takeExpValueFromInput.bind(this);
        this.expAdd = this.expAdd.bind(this);
        this.myExpForm = React.createRef();
        this.state = initialState;
    }
    componentDidMount() {
        //get Company
             axios
                 .get(`http://127.0.0.1:8000/api/company/${item}`)
                 .then(response => {
                     this.setState({
                         my_com: response.data
                     });
                 })
                 .catch(error => console.log(error));
        //dep_his_date_curent
        Axios.get(`http://127.0.0.1:8000/api/dep/history/current/date`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    dep_his: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        //dep list
        Axios.get(`http://127.0.0.1:8000/api/dep/list`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    dep_type: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
            //exp_his_date_curent
        Axios.get(`http://127.0.0.1:8000/api/exp/history/current/date`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    exp_his: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        //exp list
        Axios.get(`http://127.0.0.1:8000/api/exp/list`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    exp_type: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
         //exp_his_date_curent
        Axios.get(`http://127.0.0.1:8000/api/exp/history/current/date`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    exp_his: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });   
    }
    //Deposit model
    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = "#f00";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    //Expense model
    openModalExp() {
        this.setState({ modalIsOpenExp: true });
    }

    afterOpenModalExp() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = "#f00";
    }

    closeModalExp() {
        this.setState({ modalIsOpenExp: false });
    }
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    searchCustomer(e) {
        e.preventDefault();
        let { cus_contact } = this.state;
        Axios.post(`http://127.0.0.1:8000/api/customer/search`, {
            cus_contact
        })
            .then(response => {
                console.log(Object.keys(response.data).length);
                if (Object.keys(response.data).length > 1) {
                    if (isObject(response.data)) {
                        this.setState({
                            get_cus: response.data,
                            not_found: "",
                            not_obj_data: ""
                        });
                    } else {
                        this.setState({
                            not_obj_data: response.data,
                            not_found: "",
                            get_cus: ""
                        });
                    }

                    console.log(response.data);
                } else {
                    this.setState({
                        not_found: "No Customer Found",
                        get_cus: "",
                        not_obj_data: ""
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        this.myForm.current.reset();
        this.setState({
            cus_contact: ""
        });
    }
    //serach order
    takeOrderValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    searchOrder(e) {
        e.preventDefault();
        let { order_id } = this.state;
        Axios.post(`http://127.0.0.1:8000/api/order/search`, {
            order_id
        })
            .then(response => {
                if (Object.keys(response.data).length > 1) {
                    if (isObject(response.data)) {
                        this.setState({
                            get_order: response.data,
                            not_order_found: "",
                            not_order_obj_data: ""
                        });
                    } else {
                        this.setState({
                            not_order_obj_data: response.data,
                            not_order_found: "",
                            get_order: ""
                        });
                    }

                    console.log(response.data);
                } else {
                    this.setState({
                        not_order_found: "No Order Found",
                        get_order: "",
                        not_order_obj_data: ""
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        this.myForm1.current.reset();
        this.setState({
            order_id: ""
        });
    }
    //add deposit
    takeDepValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    depAdd(e) {
        e.preventDefault();
        let { dep_amount, dep_select_type } = this.state;
         let comp_id = this.state.my_com.comp_id;
        Axios.post(`http://127.0.0.1:8000/api/dep/history/add`, {
            dep_amount,
            dep_select_type,
            comp_id
        })
            .then(response => {
                this.setState({
                    dep_success: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        this.myDepForm.current.reset();
        this.setState({
            dep_amount: "",
            dep_select_type: ""
        });
        //get company amount
        axios
            .get(`http://127.0.0.1:8000/api/company/${item}`)
            .then(response => {
                this.setState({
                    my_com: response.data
                });
            })
            .catch(error => console.log(error));
        //dep_his_date_curent
        Axios.get(`http://127.0.0.1:8000/api/dep/history/current/date`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    dep_his: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    //add Expense
    takeExpValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state.exp_amount)
    }
    expAdd(e) {
        e.preventDefault();
        let { exp_amount, exp_select_type } = this.state;
          let comp_id = this.state.my_com.comp_id;
        Axios.post(`http://127.0.0.1:8000/api/exp/history/add`, {
            exp_amount,
            exp_select_type,
            comp_id
        })
            .then(response => {
                this.setState({
                    exp_success: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        this.myExpForm.current.reset();
        this.setState({
            exp_amount: "",
            exp_select_type: ""
        });
         //get company amount
        axios
            .get(`http://127.0.0.1:8000/api/company/${item}`)
            .then(response => {
                this.setState({
                    my_com: response.data
                });
            })
            .catch(error => console.log(error));
        //exp_his_date_curent
        Axios.get(`http://127.0.0.1:8000/api/exp/history/current/date`)
            .then(res => {
                //console.log(response.data)
                this.setState({
                    exp_his: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        var dep_total = 0;
        var exp_total = 0;
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top add_payment={this.state.my_com.comp_amount} />

                    <div className="row">
                        <div className="col-md-12">
                            <h3>
                                <i className="fas fa-tachometer-alt fa-2x"></i>{" "}
                                Dashboard
                            </h3>
                            <div className="alert alert-info" role="alert">
                                Rkb's Territory,Good to see you back
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="alert"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div
                                        className="card text-center"
                                        style={{
                                            background: "#7386D5",
                                            color: "white",
                                            height: "25px"
                                        }}
                                    >
                                        <b>View Customer Details</b>
                                        <div className="card-body">
                                            <form
                                                ref={this.myForm}
                                                onSubmit={this.searchCustomer}
                                            >
                                                <table className="table table-bordered table-condensed">
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="">
                                                                <input
                                                                    type="text"
                                                                    name="cus_contact"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .cus_contact
                                                                    }
                                                                    style={{
                                                                        width:
                                                                            "100%",
                                                                        boxSizing:
                                                                            "border-box",
                                                                        border:
                                                                            "none",
                                                                        borderBottom:
                                                                            "2px solid red"
                                                                    }}
                                                                    placeholder="ENTER CUSTOMER CONTACT"
                                                                    onChange={
                                                                        this
                                                                            .takeValueFromInput
                                                                    }
                                                                />
                                                            </td>
                                                            <td colSpan="">
                                                                <button className="btn btn-info btn-sm">
                                                                    <i className="fas fa-check-square"></i>{" "}
                                                                    SEARCH
                                                                    CUSTOMER
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2">
                                                                {this.state
                                                                    .not_found && (
                                                                    <p className="text-danger text-center ml-3">
                                                                        {
                                                                            this
                                                                                .state
                                                                                .not_found
                                                                        }
                                                                    </p>
                                                                )}
                                                                {Object.keys(
                                                                    this.state
                                                                        .get_cus
                                                                ).length >
                                                                    0 && (
                                                                    <table className="text-danger table table-condensed table-striped table-hover">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    {
                                                                                        this
                                                                                            .state
                                                                                            .get_cus
                                                                                            .c_name
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        this
                                                                                            .state
                                                                                            .get_cus
                                                                                            .c_contact
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        "Details"
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                )}
                                                                {this.state
                                                                    .not_obj_data && (
                                                                    <p className="text-danger text-center ml-3">
                                                                        {
                                                                            this
                                                                                .state
                                                                                .not_obj_data
                                                                        }
                                                                    </p>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div
                                        className="card text-center"
                                        style={{
                                            background: "#7386D5",
                                            color: "white",
                                            height: "25px"
                                        }}
                                    >
                                        <b>View Order Details</b>
                                        <div className="card-body">
                                            <form
                                                ref={this.myForm1}
                                                onSubmit={this.searchOrder}
                                            >
                                                <table className="table table-bordered table-condensed table-hover table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan="">
                                                                <input
                                                                    type="text"
                                                                    name="order_id"
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .order_id
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .takeOrderValueFromInput
                                                                    }
                                                                    style={{
                                                                        width:
                                                                            "100%",
                                                                        boxSizing:
                                                                            "border-box",
                                                                        border:
                                                                            "none",
                                                                        borderBottom:
                                                                            "2px solid red"
                                                                    }}
                                                                    placeholder="ENTER ORDER ID"
                                                                />
                                                            </td>
                                                            <td colSpan="">
                                                                <button className="btn btn-danger btn-sm">
                                                                    <i className="fas fa-check-square"></i>{" "}
                                                                    SEARCH ORDER
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2">
                                                                {this.state
                                                                    .not_order_found && (
                                                                    <p className="text-danger text-center ml-3">
                                                                        {
                                                                            this
                                                                                .state
                                                                                .not_order_found
                                                                        }
                                                                    </p>
                                                                )}
                                                                {Object.keys(
                                                                    this.state
                                                                        .get_order
                                                                ).length >
                                                                    0 && (
                                                                    <table className="text-danger table table-condensed table-striped table-hover">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    {
                                                                                        this
                                                                                            .state
                                                                                            .get_order
                                                                                            .o_code
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        this
                                                                                            .state
                                                                                            .get_order
                                                                                            .c_name
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    {
                                                                                        this
                                                                                            .state
                                                                                            .get_order
                                                                                            .st_name
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    <NavLink
                                                                                        to={`/invoice/${this.state.get_order.o_code}`}
                                                                                        className="badge btn btn-danger"
                                                                                    >
                                                                                        <i className="fas fa-eye"></i>{" "}
                                                                                        View
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                )}
                                                                {this.state
                                                                    .not_order_obj_data && (
                                                                    <p className="text-danger text-center ml-3">
                                                                        {
                                                                            this
                                                                                .state
                                                                                .not_order_obj_data
                                                                        }
                                                                    </p>
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
                    <div className="row" style={{ marginTop: "180px" }}>
                        <div className="col-md-6">
                            <table className="table table-condensed table-hover table-striped">
                                <tbody>
                                    <tr>
                                        <td>
                                            <i className="fa fa-plus fa-3x float left"></i>
                                        </td>
                                        <td className="float-right">
                                            <h3>Today's Deposit</h3>

                                            {this.state.dep_his.length > 0 ? (
                                                <span>
                                                    {this.state.dep_his.map(
                                                        (d_his, index) => {
                                                            dep_total =
                                                                dep_total +
                                                                d_his.dep_h_amount;
                                                        }
                                                    )}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                            <h4 className="text-right">
                                                {dep_total}
                                            </h4>
                                            <button
                                                className="badge btn btn-sm btn-outline-primary float-right"
                                                onClick={this.openModal}
                                            >
                                                Add Deposit
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h5
                                    className="text-primary"
                                    ref={subtitle => (this.subtitle = subtitle)}
                                >
                                    ADD DEPOSIT
                                </h5>
                                {this.state.dep_success && (
                                    <p className="text-danger text-center">
                                        {this.state.dep_success}
                                    </p>
                                )}
                                <form
                                    ref={this.myDepForm}
                                    onSubmit={this.depAdd}
                                >
                                    <select
                                        className="form-control"
                                        name="dep_select_type"
                                        required=""
                                        onChange={this.takeDepValueFromInput}
                                    >
                                        <option key="x" value="">
                                            Select Deposit Type
                                        </option>
                                        {this.state.dep_type.map(type => {
                                            return (
                                                <option
                                                    key={type.dep_id}
                                                    value={type.dep_id}
                                                >
                                                    {type.dep_name}
                                                </option>
                                            );
                                        })}
                                    </select>{" "}
                                    <br></br>
                                    <input
                                        type="text"
                                        name="dep_amount"
                                        className="form-control"
                                        value={this.state.dep_amount}
                                        onChange={this.takeDepValueFromInput}
                                        placeholder="Enter Deposit Amount..."
                                    />
                                    <br></br>
                                    <button className="btn btn-sm btn-outline-danger float-right">
                                        SUBMIT
                                    </button>
                                </form>
                            </Modal>
                        </div>
                        <div className="col-md-6">
                            <table className="table table-condensed table-hover table-striped">
                                <tbody>
                                    <tr>
                                        <td>
                                            <i className="fa fa-minus fa-3x float left"></i>
                                        </td>
                                        <td className="float-right">
                                            <h3>Today's Expense</h3>
                                            {this.state.exp_his.length > 0 ? (
                                                <span>
                                                    {this.state.exp_his.map(
                                                        (e_his, index) => {
                                                            exp_total =
                                                                exp_total +
                                                                e_his.exp_h_amount;
                                                        }
                                                    )}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                            <h4 className="text-right">
                                                {exp_total}
                                            </h4>
                                            <button
                                                className="badge btn btn-sm btn-outline-danger float-right"
                                                onClick={this.openModalExp}
                                            >
                                                Add Expense
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Modal
                                isOpen={this.state.modalIsOpenExp}
                                onAfterOpen={this.afterOpenModalExp}
                                onRequestClose={this.closeModalExp}
                                style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h5
                                    className="text-danger"
                                    ref={subtitle => (this.subtitle = subtitle)}
                                >
                                    ADD EXPENSE
                                </h5>
                                {this.state.exp_success && (
                                    <p className="text-danger text-center">
                                        {this.state.exp_success}
                                    </p>
                                )}
                                <form
                                    ref={this.myExpForm}
                                    onSubmit={this.expAdd}
                                >
                                    <select
                                        className="form-control"
                                        name="exp_select_type"
                                        required=""
                                        onChange={this.takeExpValueFromInput}
                                    >
                                        <option key="x" value="">
                                            Select Expense Type
                                        </option>
                                        {this.state.exp_type.map(exp_type => {
                                            return (
                                                <option
                                                    key={exp_type.exp_id}
                                                    value={exp_type.exp_id}
                                                >
                                                    {exp_type.exp_name}
                                                </option>
                                            );
                                        })}
                                    </select>{" "}
                                    <br></br>
                                    <input
                                        type="text"
                                        name="exp_amount"
                                        className="form-control"
                                        value={this.state.exp_amount}
                                        onChange={this.takeExpValueFromInput}
                                        placeholder="Enter Expense Amount..."
                                    />
                                    <br></br>
                                    <button className="btn btn-sm btn-outline-danger float-right">
                                        SUBMIT
                                    </button>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
