import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import {productDetailsAction} from "../../Store/actions/User/Products/productsAction";
import { paginationAction } from "../../Store/actions/User/Pagination/paginationAction";
import "./pagination.css";
import { FetchMainCategoryAction } from "../../Store/actions/Admin/Category/categoryAction";

class SearchProductPagination extends Component{
    constructor(props){
        super(props);
        this.state={
            products:{
               product :this.props.products
            }

        }
    }

    componentDidMount(){
        
        console.log(this.state.products);
        this.props.paginationAction(this.props.pageNo,this.state.products);
        this.props.FetchMainCategoryAction();
    }
    handlePagination = (pageNo) => {
        let page =[];
        console.log("hii");
        console.log(this.props.productPagination.productPageNoLimit)
        for(var i=1; i<=pageNo;i++){
            if(parseInt(this.props.pageNo) === i){
                console.log("hii");   
            page.push(<li className="page-item active" key={i}><a className="page-link" href={`/searched product/data/data=${this.props.value}/pageNo/pageNo=${i}`}>{i}</a></li>)                
            }
            else{
                page.push(<li className="page-item" key={i}><a className="page-link" href={`/searched product/data/data=${this.props.value}/pageNo/pageNo=${i}`}>{i}</a></li>)                
            }
            
        }
       return page
    
    }
    render(){ 
        // if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{alignSelf:"center", marginTop:"200px"}}></i>}
        if(!this.props.productPagination){return null}
        return(
            <React.Fragment >
                <div className="row" style={{backgroundColor:"rgb(241, 243, 246)"}}>
             
            {
                
                this.props.productPagination.data.map(data=>(
                    
                        <div className="col-sm-5 col-md-2 col-lg-3 mt-4" key={data._id}>
                        <div className="card">
                           <a style={{textAlign:"center"}} onClick={()=> window.open(`/productdetails/${data._id}`)}><img className="card-img-top"style={{width:"60%"}} src={data.image}/>  </a>
                           <div className="card-body">
                                <p className="card-title">{data.brandName}{data.productName}</p>
                                <h6 className="card-subtitle">₹{data.offerPrice}
                                <span className="linethrough" style={{textDecoration:"line-through"}}>₹{data.price}</span>
                                <span className="percentOff">{data.percentOff ? data.percentOff +"% Off" :null}</span>
                                </h6>
                                <h6 className="freedelivery">{data.shippingCharges ? "Delivery Charges: "+"₹"+data.shippingCharges: "FREE DELIVERY"}</h6>
                              
                           </div>
                          
                        </div>
                        
                    </div>
                    
                  
                    ))
            }
        </div>
            
               <hr className="horizontalLine" />
               {
                   this.props.productPagination ? 
                   <>
                   <nav aria-label="Pagenavigationexample">
                    <ul className="pagination">
                        {
                            parseInt(this.props.pageNo) === 1 ? 
                            <li className="page-item">
                            <a className="page-link" aria-disabled="true" aria-label="Previous">
                                <span aria-hidden="true">«</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>
                            :
                            
                            <li className="page-item">
                            <a className="page-link"  href={`/searched product/data/data=${this.props.value}/pageNo/pageNo=${parseInt(this.props.pageNo)-1}`} aria-label="Previous">
                                <span aria-hidden="true">«</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>
                        }
                       
                        {this.handlePagination(this.props.productPagination.productPageNoLimit)}

                        {
                            parseInt(this.props.pageNo) === this.props.productPagination.productPageNoLimit ?
                        
                            <li className="page-item">
                        <a className="page-link" aria-disabled="true" aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </a>
                        </li>
                        :
                        <li className="page-item">
                        <a className="page-link" href={`/searched product/data/data=${this.props.value}/pageNo/pageNo=${parseInt(this.props.pageNo)+1}`} aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </a>
                        </li>
                        }
                        
                    </ul>
                </nav>
                </>
                : null
               }
               
                </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    console.log(state);
    
    return {
        products: ownProps.product,
        pageNo: ownProps.pageNo,
        value: ownProps.value,
        data:ownProps.data,
        productPagination: state.pagination.data
    };
}

export default connect(mapStateToProps,{ paginationAction, productDetailsAction, FetchMainCategoryAction })(SearchProductPagination);