import React, { Component } from "react";
import Nav_Top from "../Nav_top";
import Nav_Side from "../Nav_side";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment";
const initialState = {
    product_list: [],
    modalIsOpen: false,
    holaid: "",
    up_qty_result:"",
    up_qty:"",
    del_success:""
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
class Product_list extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.takeValueFromInput = this.takeValueFromInput.bind(this);
        this.productQtyUp = this.productQtyUp.bind(this);
        this.myForm = React.createRef();
    }
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
    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/api/product/list")
            .then(res => {
                this.setState({
                    product_list: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    takeValueFromInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //update product quantity
    productQtyUp(e) {
        e.preventDefault();
        var up_id = this.state.holaid;
        var up_qty = this.state.up_qty;
        axios
            .post(`http://127.0.0.1:8000/api/product/qty/update`, {
                up_id,
                up_qty
            })
            .then(response => {
              console.log(response.data)
                this.setState({
                    up_qty_result: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
        this.myForm.current.reset();
        this.setState({
            up_qty: ""
        });
        //get product list again
        axios
            .get("http://127.0.0.1:8000/api/product/list")
            .then(res => {
                this.setState({
                    product_list: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
        //delete product
    deleteProduct(get_pro_id) {
        axios
            .get(
                `http://127.0.0.1:8000/api/product/del/${get_pro_id}`
            )
            .then(response => {
                this.setState({
                    del_success: response.data
                });
            })
            .catch(error => console.log(error));
        //get product list again
        axios
            .get(
                "http://127.0.0.1:8000/api/product/list"
            )
            .then(res => {
                this.setState({
                    product_list: res.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const columns = [
            {
                Header: <div className=" btn-danger">#SL</div>,
                Cell: row => {
                    return <div>{row.index + 1}</div>;
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className="btn-danger"> ID</div>,
                id: "in_o_code6",
                accessor: "p_unique_id",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Name</div>,
                id: "in_o_code",
                accessor: "p_name",
                filterable: true,

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Quantity</div>,
                id: "in_o_cod555",
                accessor: "p_qty",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Buy Price</div>,
                id: "22",
                accessor: "p_buy_price",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Sell Price</div>,
                id: "55544",
                accessor: "p_sell_price",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Wholesale</div>,
                id: "in_o_2223code1",
                accessor: "p_w_sell_price",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Installment</div>,
                id: "in_o_c36ode1",
                accessor: "p_i_sell_price",

                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Up Qty</div>,
                id: "click",
                accessor: d => {
                    return (
                        <button
                            className="btn btn-info badge"
                            onClick={() =>
                                this.setState({
                                    modalIsOpen: true,
                                    holaid: d.p_id
                                })
                            }
                        >
                            <i className="fas fa-eye"></i> Add Qty
                        </button>
                    );
                },
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: <div className=" btn-danger">Delete</div>,
                id: "click1",
                accessor: d => {
                    return (
                        <button
                            className="btn btn-danger badge"
                            onClick={()=>{this.deleteProduct(d.p_id)}}
                        >
                            <i className="fas fa-trash"></i> Delete
                        </button>
                    );
                },
                style: {
                    textAlign: "center"
                }
            }
        ];
        return (
            <div class="wrapper">
                <Nav_Side />
                <div id="content">
                    <Nav_Top />
                    <div className="row">
                        <div className="col-md-12">
                            <h1>
                                <i className="fa fa-list"></i> Product List
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    {this.state.del_success && (
                                        <p className="text-danger text-center">
                                            {this.state.del_success}
                                        </p>
                                    )}
                                    <ReactTable
                                        columns={columns}
                                        data={this.state.product_list}
                                        defaultPageSize={5}
                                        noDataText={"No data found"}
                                    />
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        <h5
                                            ref={subtitle =>
                                                (this.subtitle = subtitle)
                                            }
                                        >
                                            ADD QUANTITY
                                        </h5>
                                        <p>Product id : {this.state.holaid}</p>
                                        {this.state.up_qty_result && (
                                            <p className="text-danger text-center">
                                                {this.state.up_qty_result}
                                            </p>
                                        )}
                                        <form
                                            ref={this.myForm}
                                            onSubmit={this.productQtyUp}
                                        >
                                            <input
                                                type="text"
                                                name="up_qty"
                                                className="form-control"
                                                value={this.state.up_qty}
                                                placeholder="ENTER PRODUCT QUANTITY..."
                                                onChange={
                                                    this.takeValueFromInput
                                                }
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
                </div>
            </div>
        );
    }
}

export default Product_list;
