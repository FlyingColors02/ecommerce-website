import React, { Component } from "react";
import { connect } from "react-redux";
import { AllCancelledOrdersAction, RefundUserAction } from "../../../Store/actions/Admin/Payment/paymentAction";


class RefundUser extends Component {

    componentDidMount = () => {
        this.props.AllCancelledOrdersAction();
    }


    render() {
        if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw"
        style={{ marginLeft: "50%", marginTop: "200px" }}></i>}
        if(!this.props.cancelledOrders){
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
                       
                       
                    </tr>
                </thead>
                {
                    this.props.cancelledOrders.map(data=>(

                <tbody key={data._id}>
                    <tr>
                    <th scope="row">{data._id}</th>
                    <td>{data.orderItem.brandName} {data.orderItem.productName}</td>
                    <td>{data.orderItem.quantity}</td>
                    <td>{data.orderItem.totalPrice}</td>  
                    <td><button onClick={()=>this.props.RefundUserAction(data._id)}>Refund</button></td>  
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

        cancelledOrders: state.cancelledOrders.data,
        loading: state.cancelledOrders.loading,
    };

}
export default connect(mapStateToProps, { AllCancelledOrdersAction, RefundUserAction })(RefundUser);