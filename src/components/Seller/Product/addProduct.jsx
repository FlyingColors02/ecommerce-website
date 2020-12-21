import React, { Component } from "react";
import "./addProduct.css";
import simpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";
import { SellLoggedInAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { connect } from "react-redux";
import { AddProductAction } from "../../../Store/actions/Seller/Product/productAction";
import { FetchMainCategoryAction } from "../../../Store/actions/Admin/Category/categoryAction";


class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            image: null ,
            description: "",
            price: 0,
            brandName:"",
            offerPrice: 0,
            stock: 0,
            shippingCharges: 0,
            isAvailable: true,
            isTodayOfferAvailable: true,
            mainCategoryName:"",
            productCategoryName: "",
            productSubCategoryName: "",
            isSeller: true,
            imagesrc:"",
            sellerDetails: {
                emailId:"",
                userName:""
            }
            }
        
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }


    componentDidMount () {
        this.props.SellLoggedInAction();
        this.props.FetchMainCategoryAction();
    }

    handleSubmitForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
           
            let data = {
                productName: this.state.productName,
                image: this.state.image,
                description: this.state.description,
                price: this.state.price,
                brandName: this.state.brandName,
                offerPrice: this.state.offerPrice,
                stock: this.state.stock,
                shippingCharges: this.state.shippingCharges,
                isAvailable: this.state.isAvailable,
                isTodayOfferAvailable: this.state.isTodayOfferAvailable,
                mainCategoryName: this.state.mainCategoryName,
                productCategoryName: this.state.productCategoryName,
                productSubCategoryName: this.state.productSubCategoryName,
                isSeller: this.state.isSeller,
                sellerDetails: {
                    emailId:this.props.seller.data.sellerLogin.emailId,
                    name: this.props.seller.data.userName
                }
            }
          
           
            // for ( var key in data.sellerDetails ) {
            //     dataImage.append(key,data.sellerDetails[key]);
            //     dataImage.set('sellerDetails',)
            // }
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

              
           
            // Object.keys(data.sellerDetails).forEach(key => {
            //     dataImage.append({'sellerDetails':{key :data.sellerDetails[key]}
                  
            //     });
            //   });

        //     let sellerDetail =JSON.stringify( Object.assign({emailId:"shraduborse97@gmail.com", name: "Shraddha"}))
        //  console.log(sellerDetail);
        //     dataImage.append('sellerDetails',sellerDetail);
            
            this.props.AddProductAction(jsonToFormData(data));
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    
    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);

    }

    onChangeHandler=event=>{
        this.setState({image: event.target.files[0],loaded: 0});
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({imagesrc: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
          }
    }
    
    displayContent = (name) => {
        var x = document.getElementById(name);
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="registration-sell">
                <form id="registration-sell" onSubmit={this.handleSubmitForm}>
                    <div className="row row-cols-1">
                        <div className="col-md-7">
                        <div className="col-md-12">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                            <h2 onClick={()=>this.displayContent("productDetails")}>PRODUCT DETAILS</h2>
                                            {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                        </div>
                                    
                                       <div id="productDetails" style={{display:"none"}}>
                                            <div className="form-group" >
                                                <input type="text" className="registration-sell-input" id="brandname" name="brandName"
                                                    placeholder="  Brand Name" value={this.state.brandName} onChange={this.handleInputData} />
                                                {this.validator.message("brandName", this.state.brandName, "alpha_num_dash_space|min:4|required")}
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="registration-sell-input" id="productname" name="productName"
                                                    placeholder="Product Name" value={this.state.productName} onChange={this.handleInputData} />
                                                {this.validator.message("productName", this.state.productName, "alpha_num_dash_space|min:4|required")}
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputprice" name="price"
                                                    placeholder="Product Price" value={this.state.price || ""} onChange={this.handleInputData} />
                                                {this.validator.message("price", this.state.price, "numeric|required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputOfferPrice" name="offerPrice"
                                                    placeholder=" offerPrice" value={this.state.offerPrice || ""} onChange={this.handleInputData} />
                                                {this.validator.message("offerPrice", this.state.offerPrice, "numeric|required")}
                                            </div>

                                            <div className="form-group">
                                                <input type="number" className="registration-sell-input" id="inputstock" name="stock"
                                                    placeholder=" No. Of Stock" value={this.state.stock || ""} onChange={this.handleInputData} />
                                                {this.validator.message("stock", this.state.stock, "numeric|required")}
                                            </div>

                                            <div className="form-group">
                                            <input type="number" className="registration-sell-input" id="inputshippingcharges" name="shippingCharges"
                                                    placeholder=" Shipping Charges" value={this.state.shippingCharges || ""} onChange={this.handleInputData} />
                                                {this.validator.message("shippingCharges", this.state.shippingCharges, "numeric|required|min:0")}
                                            </div>
                                            <div className="form-group">
                                                <textarea rows="8" cols="55" className="registration-sell-input" id="description" name="description"
                                                    placeholder="  Description
                                                    Note: Please enter(new line) once you complete a line ...so it can be used for highlights" value={this.state.description} onChange={this.handleInputData} >
                                                </textarea>
                                                {this.validator.message("description", this.state.description, "string|min:20|required")}
                                            </div>
                                            </div>
                                    </div>
                                    
                                </div></div>
                        </div>
                        <div className="col-md-12">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                            <h2 onClick={()=>this.displayContent("productImages")}>PRODUCT IMAGES</h2>
                                            {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                        </div>
                                    <div id="productImages">
                                    <form encType="multipart/form-data" id="registration-sell">
                                           
                                            
                                           <div className="form-group">
                                               <input type="file" name="image"accept="image/*" style={{overflow:"hidden"}} onChange={this.onChangeHandler}/>
                                               <div>
                                               {
                                                   this.state.imagesrc ? <img src={this.state.imagesrc} alt={this.state.imagesrc} style={{height:"200px",width:"200px", alignSelf:"center"}}/> : null
                                               }
                                               </div>
                                               
                                               
                                             {/* <button type="button" className="registration-sell-file-button" name="image" value={this.state.image} onClick={this.handleOnChangeImage}>Upload Images</button> */}
                                             <br/><br/>

                                           </div>
                                       </form>
                                    </div>
                                       
                                    </div>
                                    
                                </div></div>
                        </div>
                        <div className="col-md-12">
                            <div className="container">
                                <div className="registration-sell-form">
                                    <div className="main-div registration-sell">
                                        <div className="panel">
                                            <h2 onClick={()=>this.displayContent("productCategory")}>PRODUCT CATEGORY</h2>
                                            {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                        </div>
                                        <div id="productCategory">
                                        {this.props.mainCategory ?
                                            <div className="form-group">
                                            <select className="CategorySelect" name="mainCategoryName" value={this.state.mainCategoryName }  onChange={this.handleInputData}>
                                                <option value="select main Category">Please Select Product Main Category</option>
                                                {this.props.mainCategory.data.map(item => (<option key={item._id} value={item.mainCategoryName}>{item.mainCategoryName}</option>))}
                                            </select>
                                            {this.validator.message("mainCategoryName", this.state.mainCategoryName, "string|required")}
                                            </div>
                                            :null }

                                            {this.props.mainCategory ?
                                            <div className="form-group">
                                            <select className="CategorySelect" name="productCategoryName" value={this.state.productCategoryName }  onChange={this.handleInputData}>
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

                                           

                                      
                                        </div>
                                            
                                    </div>
                                    
                                </div></div>
                        </div> 
                        <div className="col-md-12">
                        <div className="registration-sell-form" style={{marginLeft:"180px", marginRight:"180px"}}>
                        <button type="submit" className="registration-sell-button">ADD PRODUCT</button>
                        </div>
                        </div>
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
                       
                    </div>
                    </form>
                    <p className="copyrightmark">© 2020-2020, amYflip.com, Inc. or its affiliates</p>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        seller: state.loggedInSeller.data,
        mainCategory: state.mainCategory.data
    };
}
export default connect(mapStateToProps, { AddProductAction, SellLoggedInAction, FetchMainCategoryAction})(AddProduct);