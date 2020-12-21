import React,{Component} from "react";
import {connect} from "react-redux";
import "./productDetails.css";
import {productDetailsAction} from "../../../Store/actions/User/Products/productsAction";
import {AddToCartAction, FetchCartDataAction} from "../../../Store/actions/User/Cart/cartAction";
import {LoginAction} from "../../../Store/actions/User/Authentication/authenticationAction";

class ProductDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            date: new Date(new Date().setDate(new Date().getDate()+2)),
        }
    }
    componentDidMount(){
        this.props.productDetailsAction(this.props.match.params.id);
    }
    handleHighlights=(description)=>{
        return description.split(/[\n\r]/g).join(`\n • `);
    }

    goToCart = (id) => {
        
        if(!this.props.error){
            let data={
                emailId: this.props.loggedInUser.data.userLogin.emailId,
                cartItem:{
                    _id: id,
                    brandName: this.props.productDetails.data.brandName,
                    quantity: 1,
                    image: this.props.productDetails.data.image,
                    price: this.props.productDetails.data.offerPrice,
                    productName: this.props.productDetails.data.productName,
                    totalPrice: this.props.productDetails.data.price,
                    stock: this.props.productDetails.data.stock,
                    shippingCharges: this.props.productDetails.data.shippingCharges,
                    sellerEmailId:this.props.productDetails.data.sellerDetails.emailId
                }
            }
            console.log(data);
            this.props.AddToCartAction(data,id)
            // this.props.productDetailsAction(id);
            
            // this.props.FetchCartDataAction();
            // this.props.history.push("/cart");
        }
        else{
            this.props.history.push("/login");
        }
        
    }
    placeOrder =(id) =>{
        if(!this.props.error){
            let user = this.props.loggedInUser.data
            this.props.history.push({pathname:`/Place Order/${id}`,
            state:user});
        }
        else{ this.props.history.push("/login");}
    }
   
    render(){
      
        if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="spinner" style={{marginLeft:"50%", marginTop:"200px"}}></i>}
        if(!this.props.productDetails){return null}
        return(
            <React.Fragment> 
                
                <div className="row">
               <div className="col-md-4 col-lg-5" style={{textAlign:"center"}}>
                   
                   <img className="productDetails-Image" src={this.props.productDetails.data.image}/>
                   
                   <div className="product-details-buttons">
                   <button className="cart-button" onClick={()=>this.goToCart(this.props.productDetails.data._id)}><i className="fa fa-shopping-cart" aria-hidden="true"></i>ADD TO CART</button>
                   <button className="buy-button" onClick={()=>this.placeOrder(this.props.productDetails.data._id)}>BUY NOW</button>
                   </div>

               </div>
                <div className="col-md-6 col-lg-5">
                    <div className="productDetailscart">
                        <div className="card-body">
                            <p className="brandName">{this.props.productDetails.data.brandName} {this.props.productDetails.data.productName}</p>
                            <h3>₹{this.props.productDetails.data.offerPrice}
                            <span className="linethroughProductDetails" style={{textDecoration:"line-through"}}>₹{this.props.productDetails.data.price}</span>
                                <span className="percentOffProductDetails">{this.props.productDetails.data.percentOff ? this.props.productDetails.data.percentOff +"% Off" :null}</span>
                               </h3>
                               {this.props.productDetails.data.stock > 0 ?<h6 className="instock"><b>IN STOCK</b></h6> :<h6 style={{color:"red"}}>OUT OF STOCK</h6>} 
                                    <p>delivered by :{this.state.date.toDateString()}</p>
                                 {this.props.productDetails.data.shippingCharges  ? <h6>Delivery Charges:  ₹{this.props.productDetails.data.shippingCharges}</h6> : <h6 className="freedelivery">"FREE DELIVERY"</h6>}
                                <h6 className="highlights"><b>HighLights :</b></h6>
                                <p>• {this.props.productDetails.data.description},{this.handleHighlights(this.props.productDetails.data.description)}</p>
                        </div>
                    </div>
               </div>
                </div>
           
            </React.Fragment>
        )
    }

}

const mapStateToProps =(state) =>{
    console.log(state);
    return {
        loading: state.productDetails.loading,
        productDetails:state.productDetails.data,
        loggedInUser: state.loggedInUser.data,
        error: state.loggedInUser.error
    };
}

export default connect(mapStateToProps,{productDetailsAction,FetchCartDataAction, AddToCartAction, LoginAction})(ProductDetails);