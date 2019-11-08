import React, { Component } from 'react';
import Axios from "axios";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { logout } from "./store/actions/companyAction";
const initialState = {
   company:{}
};
var item = localStorage.getItem("token");
export class Nav_top extends Component {
           constructor(props) {
               super(props);
               this.state = initialState;
           }
           componentDidMount() {
           if(item){
                   Axios.get(`http://127.0.0.1:8000/api/company/${item}`)
                       .then(res => {
                           this.setState({
                               company: res.data
                           });
                       })
                       .catch(error => {
                           console.log(error);
                       });
           }
           else{
               Axios.get(
                   `http://127.0.0.1:8000/api/company/${this.props.comp_log.comp_code}`
               )
                   .then(res => {
                       this.setState({
                           company: res.data
                       });
                   })
                   .catch(error => {
                       console.log(error);
                   });
           }

           }
           render() {
               return (
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                       <div className="container-fluid">
                           <button
                               className="btn btn-dark d-inline-block d-lg-none ml-auto"
                               type="button"
                               data-toggle="collapse"
                               data-target="#navbarSupportedContent"
                               aria-controls="navbarSupportedContent"
                               aria-expanded="false"
                               aria-label="Toggle navigation"
                           >
                               <i className="fas fa-align-justify" />
                           </button>
                           <div
                               className="collapse navbar-collapse"
                               id="navbarSupportedContent"
                           >
                               <ul className="nav navbar-nav ml-auto">
                                   <li className="nav-item active">
                                       <a className="nav-link" href="#">
                                           Admin Name :{" "}
                                           <button className="btn btn-primary badge">
                                               {this.state.company.comp_title}
                                           </button>
                                       </a>
                                   </li>
                                   <li className="nav-item active">
                                       {this.props.add_payment ? (
                                           <a className="nav-link" href="#">
                                               Total Balance :{" "}
                                               <button className="btn btn-danger badge">
                                                   {this.props.add_payment}
                                               </button>
                                           </a>
                                       ) : (
                                           <a className="nav-link" href="#">
                                               Total Balance :{" "}
                                               <button className="btn btn-danger badge">
                                                   {
                                                       this.state.company
                                                           .comp_amount
                                                   }
                                               </button>
                                           </a>
                                       )}
                                   </li>
                                   <li className="nav-item active">
                                       {this.props.isLoginAuth ? (
                                           <button
                                               className="btn badge btn-info btn-md"
                                               style={{ marginTop: "11px" }}
                                               onClick={() =>
                                                   this.props.logout(
                                                       this.props.history
                                                   )
                                               }
                                           >
                                               Logout
                                           </button>
                                       ) : (
                                           "nothing"
                                       )}
                                   </li>
                               </ul>
                           </div>
                       </div>
                   </nav>
               );
           }
       }



const mapStateToProps = state => ({
    comp_log: state.add_company.com_log_success,
    isLoginAuth: state.add_company.isLoginAuth
});
export default connect(mapStateToProps,{logout})(withRouter(Nav_top));
