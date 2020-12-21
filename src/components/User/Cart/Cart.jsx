import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchCartDataAction, RemoveCartDataAction, AddQuantityAction, RemoveQuantityAction, UpdateCartDataAction } from "../../../Store/actions/User/Cart/cartAction";
import "./Cart.css";

class Cart extends Component { 
   
    componentDidMount=()=>{
        this.props.FetchCartDataAction();
    }   
    removeCartData=(id)=>{
       this.props.RemoveCartDataAction(id);
       window.location.reload();
   }

   AddQuantity = (item)=>{
    
    this.props.AddQuantityAction(item);
     let data={
         emailId:this.props.login.data.userLogin.emailId,
     cartItem:{
         _id: item._id,
         brandName: item.cartItem.brandName,
         quantity: item.cartItem.quantity,
         image: item.cartItem.image,
         price: item.cartItem.price,
         productName: item.cartItem.productName,
         totalPrice: item.cartItem.price,
         stock:item.cartItem.stock,
         shippingCharges: item.cartItem.shippingCharges,
         sellerEmailId: item.cartItem.sellerEmailId
    }}
    console.log(data);
    this.props.UpdateCartDataAction(data,item._id);

}

    RemoveQuantity = (item)=>{
    
        this.props.RemoveQuantityAction(item);
        let data={
            emailId:this.props.login.data.userLogin.emailId,
        cartItem:{
            _id: item._id,
            brandName: item.cartItem.brandName,
            quantity: item.cartItem.quantity,
            image: item.cartItem.image,
            price: item.cartItem.price,
            stock: item.cartItem.stock,
            productName: item.cartItem.productName,
            totalPrice: item.cartItem.price,
            shippingCharges: item.cartItem.shippingCharges,
            sellerEmailId: item.cartItem.sellerEmailId
        }}
        console.log(data);
        this.props.UpdateCartDataAction(data,item._id);
       
}
placeOrder =() =>{
    if(!this.props.error){
        let user = this.props.login.data
        this.props.history.push({pathname:`/Place Order/1`,
        state:user});
    }
    else{ this.props.history.push("/login");}
}
    render() { 
        if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{alignSelf:"center", marginTop:"200px"}}></i>}
        if(!this.props.cart){ return <h1 style={{textAlign:"center"}}>EMPTY CART</h1>}
        if (this.props.cart.length > 0) {
            return (
                <React.Fragment>
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                            <tr>
                                <th style={{ width: "50%" }}>Product</th>
                                <th style={{ width: "10%" }}>Price</th>
                                <th style={{ width: "13%" }}>Quantity</th>
                                <th style={{ width: "22%" }} className="text-center">Subtotal</th>
                                <th style={{ width: "5%" }}> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.cart.map(data => (
                                    <tr key={data._id}>
                                        <td data-th="Product" >
                                            <div className="row">
                                                <div className="col-sm-4 col-md-4 hidden-xs"><img src={data.cartItem.image} alt={data.cartItem.brandName} className="img-responsive" /></div>
                                                <div className="col-sm-8 col-md-7">
                                                    <h6 className="product-name">{data.cartItem.brandName} {data.cartItem.productName}</h6>
                                                    <p className="instock">{data.cartItem.stock > 0 ? "In Stock" : "Out Of Stock"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {data.cartItem.shippingCharges? 
                                        <td data-th="Price">₹ {data.cartItem.price} + ₹ {data.cartItem.shippingCharges}</td>:
                                        <td data-th="Price">₹ {data.cartItem.price}</td>}
                                        <td data-th="Quantity">
                                            <span>
                                                <i className="fa fa-minus-circle" aria-hidden="true"
                                            onClick={()=> this.RemoveQuantity(data)}></i>
                                                </span><span  className="badge-quantity" value={data.cartItem.quantity}>
                                                {data.cartItem.quantity}
                                            </span>
                                            <span>
                                            <i className="fa fa-plus-circle" aria-hidden="true"
                                            onClick={()=>this.AddQuantity(data)}></i>
                                            </span>
                                            
                                        </td>
                                        <td data-th="Subtotal" className="text-center">₹ {data.cartItem.price * data.cartItem.quantity}</td>
                                        <td className="actions" data-th="">
                                            <button  className="btn btn-danger btn-sm" onClick={()=>this.removeCartData(data._id)}><i className="fa fa-trash-o"></i></button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                        <tfoot className="fixed-bottom" style={{background:"white"}}>
                            <tr>
                                <td>
                                    <button onClick={()=> this.props.history.push("/home")} className="btn btn-warning" style={{fontSize:"22px"}}><i className="fa fa-angle-left"></i>Continue Shopping</button>
                                    </td>
                                <td colSpan="10" className="hidden-xs"></td>
                                <td></td> <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                                <td className="hidden-xs text-center" style={{fontSize:"22px"}} ><strong>Total ₹ {this.props.total}</strong></td>
                                <td><button onClick={()=>this.placeOrder()} className="btn btn-success btn-block" style={{fontSize:"22px"}}>Checkout<i className="fa fa-angle-right"></i></button></td>
                            </tr>
                        </tfoot>
                    </table>
                </React.Fragment>

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
        loading: state.Cart.loading,
        cart: state.Cart.data,
        error:state.loggedInUser.error,
        total:state.Cart.data? state.Cart.data.length > 1 ?  state.Cart.data.reduce((accumlator,nextValue)=>(
            accumlator + nextValue.cartItem.price * nextValue.cartItem.quantity + nextValue.cartItem.shippingCharges
        ),0): null:null
    };
    
}
export default connect(mapStateToProps, { FetchCartDataAction , RemoveCartDataAction, AddQuantityAction, RemoveQuantityAction, UpdateCartDataAction})(Cart);
