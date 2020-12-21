import React, { Component } from "react";
import "./addProduct.css";
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { SellLoggedInAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { connect } from "react-redux";
import { UpdateProductAction } from "../../../Store/actions/Seller/Product/productAction";
import { productDetailsAction } from "../../../Store/actions/User/Products/productsAction";
import { FetchMainCategoryAction } from "../../../Store/actions/Admin/Category/categoryAction";


class UpdateProduct extends Component {
    constructor(props,{product}) {
        super(props,{product} );
     console.log(this.props.product);

            this.state = {
             
                productName: this.props.product.product[0].productName,
                image:  this.props.product.product[0].image,
                description: this.props.product.product[0].description,
                price:  this.props.product.product[0].price,
                brandName: this.props.product.product[0].brandName,
                offerPrice: this.props.product.product[0].offerPrice,
                stock: this.props.product.product[0].stock,
                shippingCharges: this.props.product.product[0].shippingCharges,
                isAvailable: this.props.product.product[0].isAvailable,
                isTodayOfferAvailable: this.props.product.product[0].isTodayOfferAvailable,
                mainCategoryName: this.props.product.product[0].mainCategoryName,
                productCategoryName: this.props.product.product[0].productCategoryName,
                productSubCategoryName: this.props.product.product[0].productSubCategoryName,
                isSeller: this.props.product.product[0].isSeller,
                imagesrc:""
                }
            console.log(this.state);
            console.log(this.props);
            
            this.validator = new simpleReactValidator({ autoForceUpdate: this });
        }
        
       


    componentDidMount(){
        // console.log(this.props.match.params.id);
        // this.props.productDetailsAction(this.props.match.params.id);
        this.props.SellLoggedInAction();
        this.props.FetchMainCategoryAction();
        
    }

    handleSubmitForm = (event) => {
        event.preventDefault();

        if (this.validator.allValid()) {
            var data = {
                productName: this.state.productName,
                image:this.state.image,
                description: this.state.description,
                price: this.state.price,
                brandName: this.state.brandName,
                offerPrice: this.state.offerPrice,
                stock: this.state.stock,
                shippingCharges: this.state.shippingCharges,
                isAvailable: true,
                isTodayOfferAvailable: true,
                mainCategoryName: this.state.mainCategoryName,
                productCategoryName: this.state.productCategoryName,
                productSubCategoryName: this.state.productSubCategoryName,
                isSeller: true,
                sellerDetails: {
                    emailId: this.props.seller.data.sellerLogin.emailId,
                    name: this.props.seller.data.userName
                }
            }


            function buildFormData(formData, data, parentKey) {
                if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                  Object.keys(data).forEach(key => {
                    buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
                  });
                } else {
                  const value = data == null ? '' : data;
              
                  formData.append(parentKey, value);
                }
              }
              
              function jsonToFormData(data) {
                const formData = new FormData();
              
                buildFormData(formData, data);
              
                return formData;
              }

            console.log(data);
           this.props.UpdateProductAction(this.props.match.params.id,jsonToFormData(data));
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
//     initialValueSetting = () => {
// if(this.props.productDetails){
//             this.setState({productName: this.props.productDetails.data.productName});
//             this.setState({image: this.props.productDetails.data.image });
//             this.setState({description: this.props.productDetails.data.description});
//             this.setState({price: this.props.productDetails.data.price});
//             this.setState({brandName: this.props.productDetails.data.brandName});
//             this.setState({offerPrice: this.props.productDetails.data.offerPrice});
//             this.setState({stock: this.props.productDetails.data.stock});
//             this.setState({shippingCharges: this.props.productDetails.data.shippingCharges});
//             this.setState({isAvailable: this.props.productDetails.data.isAvailable});
//             this.setState({isTodayOfferAvailable: this.props.productDetails.data.isTodayOfferAvailable});
//             this.setState({mainCategoryName: this.props.productDetails.data.mainCategoryName});
//             this.setState({productCategoryName:this.props.productDetails.data.productCategoryName});   
//             this.setState({productSubCategoryName: this.props.productDetails.data.productSubCategoryName});
//             this.setState({isSeller: true})
// }  
//     }
    
    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);

    }

    onChangeHandler=event=>{
        this.setState({image: event.target.files[0]});
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({imagesrc: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
          }
        // for (var i = 0; i < event.target.files.length; i++) {

        //     var file = event.target.files[i];
    
        //     var img = document.createElement("img");
        //     var reader = new FileReader();
        //     reader.onload = function( event ) {
        //          img.src = reader.result;
        //     }
        //     reader.readAsDataURL(file);
            // console.log(img);
            // this.setState({imagesrc:img})
            // console.log(this.state.imagesrc)
        
    }
    
    render() {
        return(
            <React.Fragment>
                <div className="registration-sell">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                        <h2>PRODUCT DETAILS</h2>
                                            {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                        </div>
                                    
                                        <form id="registration-sell" onSubmit={this.handleSubmitForm}>
                                            <div className="form-group">
                                                <input type="text" className="registration-sell-input" id="brandname" name="brandName"
                                                    placeholder="Brand Name" value={this.state.brandName ||"" } onChange={this.handleInputData} />
                                                {this.validator.message("brandName", this.state.brandName, "alpha_num_dash_space|min:4|required")}
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="registration-sell-input" id="productname" name="productName"
                                                    placeholder="Product Name" value={this.state.productName } onChange={this.handleInputData} />
                                                {this.validator.message("productName", this.state.productName, "alpha_num_dash_space|min:4|required")}
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputprice" name="price"
                                                    placeholder=" Product Price" value={this.state.price } onChange={this.handleInputData} />
                                                {this.validator.message("price", this.state.price, "numeric|required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputOfferPrice" name="offerPrice"
                                                    placeholder=" offerPrice" value={this.state.offerPrice || ""} onChange={this.handleInputData} />
                                                {this.validator.message("offerPrice", this.state.offerPrice, "numeric|required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputstock" name="stock"
                                                    placeholder="No. Of Stock" value={this.state.stock || ""} onChange={this.handleInputData} />
                                                {this.validator.message("stock", this.state.stock, "numeric|required")}
                                            </div>

                                            <div className="form-group">
                                            <input type="number" className="registration-sell-input" id="inputshippingcharges" name="shippingCharges"
                                                    placeholder="Shipping Charges" value={this.state.shippingCharges || ""} onChange={this.handleInputData} />
                                                {this.validator.message("shippingCharges", this.state.shippingCharges, "numeric|required|min:0")}
                                            </div>
                                            <div className="form-group">
                                                <textarea rows="8" cols="55" className="registration-sell-input" id="description" name="description"
                                                    placeholder=" Description 
                                                    Note: Please enter(new line) once you complete a line ...so it can be used for highlights" value={this.state.description} onChange={this.handleInputData} >
                                                </textarea>
                                                {this.validator.message("description", this.state.description, "string|min:20|required")}
                                            </div>
                                            
                                        </form>
                                    </div>
                                    
                                </div></div>
                        </div>
                        <div className="col-md-4">
                            <div className="container sell-registration-text">
                                <h3 style={{ paddingBottom:"20px"}}>Sell to crores of customers on amYflip, right from your doorstep!</h3>
                                <hr className="horizontalLine-white" />
                                
                                      
                                <h5 className="info-sell">How will this information be used?</h5>
                                <p>
                                You can use your email address or mobile number as 'Username' to login to your amYflip Seller Account.
                                Please note, the 'Username' and 'Password' used here are only to access your amYflip Seller Account and can’t be used on amYflip.com shopping destination.
                                </p>
                                <hr className="horizontalLine-white" />
                            </div>
                        </div>
                       
                        <div className="col-md-7">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                            <h2>PRODUCT IMAGES</h2>
                                            {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                        </div>
                                    
                                        <form encType="multipart/form-data" >
                                            
                                            <div className="form-group">
                                                <input type="file" name="image"accept="image/*" style={{overflow:"hidden"}} onChange={this.onChangeHandler}/>
                                                <br/><br/>
                                                {
                                                    this.state.imagesrc ? <img  src={this.state.imagesrc} alt={this.state.imagesrc} style={{height:"200px", width:"200px"}}/>
                                                    :<div><img src={this.state.image} alt={this.state.image} style={{height:"200px", width:"200px"}}/> <br/>
                                                    <br/>
                                                    {/* TO VIEW FULL IMAGE CLICK BELOW LINK
                                                    <br/>
                                                      <button style={{border:"0px"}} onClick={()=>window.open(this.state.image)}>{this.state.image}</button> */}
                                                      </div>
                                                }
                                               
                                               
                                              
                                              {/* <button type="button" className="registration-sell-file-button" name="image" value={this.state.image} onClick={this.handleOnChangeImage}>Upload Images</button> */}
                                              <br/><br/>
                                              {/* <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>  */}

                                            </div>
                                        </form>
                                    </div>
                                    
                                </div></div>
                        </div>
                        

                        <div className="col-md-7">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                            <h2>PRODUCT CATEGORY</h2>
                                            {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                        </div>
                                        <form id="registration-sell" onSubmit={this.handleSubmitForm}>

                                            {this.props.mainCategory ?
                                            <div className="form-group">
                                            <select className="CategorySelect" name="mainCategoryName" value={this.state.mainCategoryName || "" }  onChange={this.handleInputData}>
                                                <option value="select main Category">Please Select Product Main Category</option>
                                                {this.props.mainCategory.data.map(item => (<option key={item._id} value={item.mainCategoryName}>{item.mainCategoryName}</option>))}
                                            </select>
                                            {this.validator.message("mainCategoryName", this.state.mainCategoryName, "string|required")}
                                            </div>
                                            :null }

                                            {this.props.mainCategory ?
                                            <div className="form-group">
                                            <select className="CategorySelect" name="productCategoryName" value={this.state.productCategoryName}  onChange={this.handleInputData}>
                                                <option value="select Category">Please Select Product Category</option>
                                                {this.props.mainCategory.data.map(item => item.category.map(item=><option key={item._id} value={item.categoryName}>{item.categoryName}</option>))}
                                            </select>
                                            {this.validator.message("productCategoryName", this.state.productCategoryName, "string|required")}
                                            </div>
                                            :null }
                                            
                                            {this.props.mainCategory ?
                                            
                                            <div className="form-group">
                                            <select className="CategorySelect" name="productSubCategoryName" value={this.state.productSubCategoryName}  onChange={this.handleInputData}>
                                                <option value="select subCategory">Please Select Product subCategory</option>
                                                {this.props.mainCategory.data.map(item => item.category.map(item=> item.subCat.map(item=><option key={item._id} value={item.subCategoryName}>{item.subCategoryName}</option>)))}
                                            </select>
                                            {this.validator.message("productSubCategoryName", this.state.productSubCategoryName, "string|required")}
                                            </div>
                                            :null }

                                            <button type="submit" className="registration-sell-button">continue</button>

                                        </form>
                                    </div>
                                    
                                </div></div>
                        </div>
                        
                       
                    </div>
                    <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    console.log(ownProps);
    console.log(state);
    // let productDetails = { productName: "",image: "", description: "",
    // price: 0,brandName: "",offerPrice: 0,stock: 0,shippingCharges: 0,
    // isAvailable:true,isTodayOfferAvailable:true,mainCategoryName: "",
    // productCategoryName: "",productSubCategoryName:"",isSeller:true,}

    // const id = ownProps.match.params.id;

    // if(id && state.productDetails){
    //     productDetails = state.productDetails.5data
    // }
    const product = ownProps.location.state;
    
    return {
        seller: state.loggedInSeller.data,
        mainCategory: state.mainCategory.data,
        productDetails: state.productDetails.data,
        loading: state.productDetails.loading,
        product : product
    };
}

export default connect(mapStateToProps, { UpdateProductAction, productDetailsAction, SellLoggedInAction, FetchMainCategoryAction})(UpdateProduct);