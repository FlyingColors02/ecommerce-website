import React, { Component } from "react";
import { connect } from "react-redux";
import { ViewUserOrderAction, RemoveUserOrderAction } from "../../../Store/actions/User/Order/orderAction";
import "../Cart/Cart.css";

class ViewUserOrder extends Component {

    componentDidMount = () => {
        this.props.ViewUserOrderAction();
    }

    removeOrderData = (id) => {
        this.props.RemoveUserOrderAction(id);
        window.location.reload();
    }


    render() {

        if (this.props.loading) { return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ alignSelf: "center", marginTop: "200px" }}></i> }
        if (!this.props.order) { return <h1 style={{textAlign:"center"}}>EMPTY ORDER LIST</h1> }
        if (this.props.order.length > 0) {
            return (
                <div className="background-order">

                    {
                        this.props.order.map(data => (

                            <div key={data._id}>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-lg-12 mt-12" >



                                        <div className="card" style={{paddingTop:"10px", paddingBottom:"20px"}}>
                                            <div className="row">
                                                <div className="col-4" style={{textAlign:"center"}}>
                                                <img className="card-img-top" style={{width:"50%"}} src={data.orderItem.image} />
                                                </div>
                                                
                                                <div className="col-4">
                                                <div className="card-body">

                                                    <p className="card-title-sell">{data.orderItem.brandName} {data.orderItem.productName}</p>
                                                    <h5>
                                                        <span style={{ fontSize: "22px", paddingRight: "20px" }}>₹{data.orderItem.price}</span>
                                                        <span>Quantity: {data.orderItem.quantity}</span>

                                                    </h5>

                                                    <br />

                                                    <h4 className="freedelivery">{data.orderItem.shippingCharges ? "SHIPPING CHARGES: ₹" + data.orderItem.shippingCharges : "Free Delivery"}</h4>
                                                    <h5>Total Price: ₹{data.orderItem.totalPrice}</h5>
                                                </div>
                                                </div>


                                                <div>
                                                    <div style={{paddingTop:"10px",paddingRight:"10px",float:"right", color:"grey"}}>
                                                        <h6>Order Id: #{data._id}</h6>
                                                    </div>
                                                    <div className="col-3">
                                                    <div style={{ paddingTop: "120px" }}>
                                                    {
                                                        data.refundUser === true ? <h5>REFUNDED</h5>:
                                                        data.cancelled === true ?<div><h5 style={{ color: "red" , textAlign:"center"}}>Cancelled Product Delivery</h5><h6 style={{color:"grey"}}>Refund will be added to your account within 7 days</h6></div> :
                                                        data.shipped === true ? <h5 style={{ color: "green" }}>SHIPPED</h5>
                                                            : <button type="button" className="btn btn-group btn-danger" style={{ marginLeft: "10px" }} onClick={() => this.removeOrderData(data._id)}>CANCEL ITEM</button>
                                                    }

                                                </div>
                                                    </div>
                                               
                                                </div>
                                                

                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>


                            </div>
                        ))

                    }


                </div>

            )
        } else {
            return <h1>Empty Cart</h1>
        }
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        login: state.loggedInUser.data,
        loading: state.placeOrder.loading,
        order: state.placeOrder.data
    };

}
export default connect(mapStateToProps, { ViewUserOrderAction, RemoveUserOrderAction })(ViewUserOrder);
