import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import { connect } from "react-redux";
import { addCompany } from "../store/actions/companyAction";
const initialState = {
    com_code: Math.floor(10000 + Math.random() * 90000),
    com_title: "",
    com_phone: "",
    com_email: "",
    com_pass: "",
    reg_success: ""
};
class Add_company extends Component {
    constructor(props) {
        super(props);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.holaOnSubmit = this.holaOnSubmit.bind(this);
        this.myForm = React.createRef();
        this.state = initialState;
    }
    componentDidUpdate() {
        setTimeout(() => this.setState({ reg_success: this.props.comp }), 20);
    }
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    holaOnSubmit(e) {
        e.preventDefault();
        let {
            com_code,
            com_title,
            com_phone,
            com_email,
            com_pass,
        } = this.state;
        this.props.addCompany(
            { com_code, com_title, com_phone, com_email, com_pass },
            this.props.history
        );

        this.myForm.current.reset();
        this.setState({
            ...initialState
        });
        setTimeout(
            () =>
                this.setState({
                    com_code: Math.floor(10000 + Math.random() * 90000)
                }),
            100
        );
    }

    render() {
        let {
            com_code,
            com_title,
            com_phone,
            com_email,
            com_pass
        } = this.state;
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
                                <h3>ATTACH COMPANY</h3>
                                {this.state.reg_success && (
                                    <p
                                        style={{ color: "white" }}
                                        className=" text-center"
                                    >
                                        {this.state.reg_success}
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
                                                    <b>TITLE:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="hidden"
                                                        value={com_code}
                                                        name="com_code"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="com_title"
                                                        value={com_title}
                                                        placeholder="ENTER COMPANY TITLE"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">
                                                    <b>CONTACT:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="com_phone"
                                                        value={com_phone}
                                                        placeholder="ENTER CONTACT NUMBER"
                                                        onChange={
                                                            this
                                                                .takeValueFromInput
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">
                                                    <b>EMAIL:</b>
                                                </td>
                                                <td colSpan="">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="com_email"
                                                        value={com_email}
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
                                                        name="com_pass"
                                                        value={com_pass}
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
                                                        REGISTER COMPANY
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
    comp: state.add_company.com_reg_success
});
export default connect(
    mapStateToProps,
    { addCompany }
)(Add_company);
