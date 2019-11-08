import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import { connect } from "react-redux";
import { loginCompany } from "../store/actions/companyAction";
import {Redirect} from 'react-router-dom'
const initialState = {
    com_log_email: "",
    com_log_pass: "",
    log_success: ""
};
class Company_login extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.holaOnSubmit = this.holaOnSubmit.bind(this);
        this.myForm = React.createRef();
        this.state = initialState;
    }
    componentDidMount() {
      // this.props.loginCompany()
    }
    componentDidUpdate() {
        setTimeout(
            () => this.setState({ log_success: this.props.comp_log }),
            20
        );
    }
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
          console.log(e.target.value);
    }
    holaOnSubmit(e) {
        e.preventDefault();
        let { com_log_email, com_log_pass } = this.state;
        this.props.loginCompany(
            { com_log_email, com_log_pass },
            this.props.history
        );
    }

    render() {
       // var item = localStorage.getItem("token");
      //  if (this.props.isLoginAuth) return <Redirect to="/" />;
        let { com_log_email, com_log_pass } = this.state;
        return (
            <div id="content">
                <div className="row">
                    <div className="col-md-5 offset-2">
                        <div className="card">
                            <div
                                className="card-header text-center"
                                style={{
                                    color: "white",
                                    background: "#7386D5"
                                }}
                            >
                                <h3>COMPANY LOGIN</h3>
                                {this.state.log_success && (
                                    <p
                                        style={{ color: "white" }}
                                        className=" text-center"
                                    >
                                        {this.state.log_success}
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
                                                    <b>EMAIL:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="com_log_email"
                                                        value={com_log_email}
                                                        placeholder="ENTER COMPANY EMAIL"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">
                                                    <b>PASSWORD:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="com_log_pass"
                                                        value={com_log_pass}
                                                        placeholder="ENTER COMPANY PASSWORD"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <button className="btn btn-outline-info btn-md float-right">
                                                        <i className="fas fa-check-square"></i>{" "}
                                                        LOGIN COMPANY
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
        );
    }
}
const mapStateToProps = state => ({
    comp_log: state.add_company.com_log_success,
    isLoginAuth: state.add_company.isLoginAuth
});
export default connect(
    mapStateToProps,
    { loginCompany }
)(Company_login);
