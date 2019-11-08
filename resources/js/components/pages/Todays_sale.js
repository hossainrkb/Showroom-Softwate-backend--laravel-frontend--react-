import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {NavLink} from 'react-router-dom';
import moment from "moment";
const initialState = {
    todays_report: []
};
class Sales_Report extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/saleType/todays/report")
            .then(res => {
                this.setState({
                    todays_report: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        var total_due = 0;
        var total_order = 0;
        var total_dis = 0;
        var total_paid = 0;
          const columns = [
              {
                  Header: "#SL",
                  Cell: row => {
                      return <div>{row.index + 1}</div>;
                  },
                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: "ORDER NO",
                  id: "in_o_code",
                  accessor: "in_o_code",
                  filterable: true,

                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: "AMOUNT",
                  id: "amount",
                  accessor: d => {
                      return <div>{d.in_subtotal}</div>;
                  },
                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: "DISCOUNT",
                  id: "amount_dis",
                  accessor: d => {
                      return <div>{d.in_discount}</div>;
                  },
                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: "PAID",
                  id: "amount_paid",
                  accessor: d => {
                      return <div>{d.in_paid}</div>;
                  },
                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: " DUE",
                  id: "due",
                  accessor: d => {
                      var total = d.in_discount + d.in_paid;
                      var due = d.in_subtotal - total;
                      return due;
                  },
                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: " SALES TYPE",
                  id: "stype",
                  accessor: d => {
                      if (d.st_name === "Wholesale"){
                          return <div className="btn btn-info badge">{d.st_name}</div>;
                      }
                     else if (d.st_name === "Regular"){
                          return <div className="btn btn-warning badge">{d.st_name}</div>;
                      }
                     else {
                          return <div className="btn btn-danger badge">{d.st_name}</div>;
                      }
                          
                  },
                  style: {
                      textAlign: "center"
                  }
              },
              {
                  Header: "PAYMENT",
                  id: "payment",
                  accessor: d => {
                      var total = d.in_subtotal - d.in_discount;
                      var payment = total - d.in_paid;
                      if (payment === 0) {
                          return (
                              <div className="btn badge btn-success">
                                  <i className="fa fa-check"></i> Paid
                              </div>
                          );
                      } else if (d.in_paid === 0) {
                          return (
                              <div className="btn badge btn-danger">
                                  <i className="fa fa-dot-circle"></i> Due
                              </div>
                          );
                      } else {
                          return (
                              <div className="badge btn btn-primary ">
                                  <i className="fa fa-adjust"></i> Partial
                              </div>
                          );
                      }
                  },
                  style: {
                      textAlign: "center"
                  }
              },

              {
                  Header: "ACTION",
                  id: "click",
                  accessor: d => {
                      return (
                          <NavLink
                              className="btn btn-info badge"
                              to={`/invoice/${d.in_o_code}`}
                          >
                              <i className="fas fa-eye"></i> Details
                          </NavLink>
                      );
                  },
                  style: {
                      textAlign: "center",
                      
                  }
              }
          ];
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top />
                    <h2>Today's Sales report</h2>
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
                                        TODAY'S HISTORY - {" "}
                                        {moment().format("YYYY-MM-DD")}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ReactTable
                                        columns={columns}
                                        data={this.state.todays_report}
                                        defaultPageSize={5}
                                        noDataText={"No data found"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sales_Report;
