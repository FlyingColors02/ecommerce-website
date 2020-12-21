import React, { Component } from "react";
import { connect } from "react-redux";
import { ViewSellerOrderAction, RemoveSellerOrderAction, ShippedTheOrderAction } from "../../../Store/actions/Seller/Order/orderAction";
import "../../User/Cart/Cart.css";

class ViewSellerOrder extends Component { 
   
    componentDidMount=()=>{
        this.props.ViewSellerOrderAction();
    }   

    removeOrderData=(id)=>{
       this.props.RemoveSellerOrderAction(id);
        window.location.reload();
   }



    render() { 
       
        if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{alignSelf:"center", marginTop:"200px"}}></i>}
        if(!this.props.order){ return <h1>EMPTY ORDER LIST</h1>}
        if (this.props.order.length > 0) {
            return (
                <div className="background-order">
                    
                            {
                                this.props.order.map(data => (
                                   
                <div key={data._id}>
                        <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 mt-12" >
                           

                           
                            <div className="card">
                            <h6 style={{textAlign:"right",paddingTop:"2px",paddingRight:"20px"}}>Delivery Date:{data.orderItem.deliveryDate}</h6>
                                <h6 style={{textAlign:"right",paddingTop:"2px",paddingRight:"20px", color:"blue"}}>Order Id: #{data._id}</h6>
                       <div className="row">
                           <div className="col-md-3" style={{textAlign:"center"}}>
                           <img className="card-img-order" style={{width:"60%"}} src={data.orderItem.image}/> 
                           </div>
                           <div className="col-md-8">
                           <div className="card-body">
                    
                               <div className="row"> 
                                   <div className="col-5">
                                       <h6 style={{color:"grey"}}><u>PRODUCT DETAILS</u></h6>
                                   <p className="card-title-sell">{data.orderItem.brandName}{data.orderItem.productName}</p>
                    <h5>
                               <span style={{fontSize:"22px", paddingRight:"20px"}}>₹{data.orderItem.price}</span> 
                               <span>Quantity: {data.orderItem.quantity}</span>
                              
                                </h5>

                                <br/>
                               
                                <h4 className="freedelivery">{data.orderItem.shippingCharges  ? "SHIPPING CHARGES: ₹" +data.orderItem.shippingCharges:"Free Delivery" }</h4>
                                    <h5>Total Price: ₹{data.orderItem.totalPrice}</h5>
                                    
                                   </div>
                                
                               <div className="col-7">
                               <h6 style={{color:"grey"}}><u>USER DETAILS</u></h6>
                                <h6>{data.userDetails.userName}</h6>
                                <h5>Contact No: {data.userDetails.mobileNo}</h5>
                               <p >Shipping Address:{data.userDetails.deliveryAddress.address},{data.userDetails.deliveryAddress.State},{data.userDetails.deliveryAddress.country}-{data.userDetails.deliveryAddress.pinCodeNo}</p>
                               
                               </div>
                              
                               
                           
                           
                            
                        </div>
                        <div style={{textAlign:"center",paddingTop:"10px"}}>
                            {data.cancelled ?<h4 style={{color:"red"}}>Cancelled Delivery</h4>
                            :<div><button type="button" className="btn btn-group btn-outline-primary" style={{marginLeft:"10px"}} onClick={()=>this.props.ShippedTheOrderAction(data._id)} >SHIPPED ITEM</button>
                            <button type="button" className="btn btn-group btn-danger" style={{marginLeft:"10px"}} onClick={()=>this.removeOrderData(data._id)}>CANCEL ITEM</button>
                            </div>
                            }
                               
                               </div>
                           </div>
                           </div>
                       </div>
                           
                          
                        {/* <h6>Description:</h6>
                            <p>• {data.description},{this.handleHighlights(data.description)}</p>
                         */}
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
        login: state.loggedInSeller.data,
        loading: state.sellerOrder.loading,
        order: state.sellerOrder.data
    };
    
}
export default connect(mapStateToProps, { ViewSellerOrderAction, RemoveSellerOrderAction, ShippedTheOrderAction})(ViewSellerOrder);
