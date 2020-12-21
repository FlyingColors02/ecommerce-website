import React, { Component } from "react";
import { connect } from "react-redux";
import { AllShippedOrdersAction, PaySellerAction } from "../../../Store/actions/Admin/Payment/paymentAction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class PaySeller extends Component {

    componentDidMount = () => {
        this.props.AllShippedOrdersAction();
    }


    render() {
        if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw"
        style={{ marginLeft: "50%", marginTop: "200px" }}></i>}
        if(!this.props.allShippedOrders){
            return <h2>Not Found</h2>
        }
        return (
            <React.Fragment>
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Pay</th>
                       
                    </tr>
                </thead>
                {
                    this.props.allShippedOrders.map(data=>(

                <tbody key={data._id}>
                    <tr>
                    <th scope="row">{data._id}</th>
                    <td>{data.orderItem.brandName} {data.orderItem.productName}</td>
                    <td>{data.orderItem.quantity}</td>
                    <td>{data.orderItem.totalPrice}</td>  
                    <td>{data.orderItem.totalPrice- 0.02*data.orderItem.totalPrice}</td>
                    <td><button onClick={()=>this.props.PaySellerAction(data._id)}>Pay</button></td>  
                    </tr>
                    
                </tbody>
            
                    ))
                }
                </table>
            </React.Fragment>
            
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {

        allShippedOrders: state.allShippedOrders.data,
        loading: state.allShippedOrders.loading,
    };

}
export default connect(mapStateToProps, { AllShippedOrdersAction, PaySellerAction })(PaySeller);