import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import {FetchAllProductsAction, productDetailsAction} from "../../../Store/actions/User/Products/productsAction";
import { productPaginationAction } from "../../../Store/actions/User/Pagination/paginationAction";
import "./products.css";

class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            nextPage : parseInt(this.props.match.params.pageNo)+1,
            previousPage : parseInt(this.props.match.params.pageNo)-1
        }
    }

    componentDidMount(){
        this.props.FetchAllProductsAction();
        this.props.productPaginationAction(this.props.match.params.pageNo);
    }
    handlePagination = (pageNo) => {
        let page =[];
        console.log("hii");
        console.log(this.props.products.productPageNoLimit)
        for(var i=1; i<=pageNo;i++){
            if(parseInt(this.props.match.params.pageNo) === i){
                console.log("hii");   
            page.push(<li class="page-item active" key={i}><a className="page-link" href={`/products/pageNo/pageNo=${i}`}>{i}</a></li>)                
            }
            else{
                page.push(<li class="page-item" key={i}><a className="page-link" href={`/products/pageNo/pageNo=${i}`}>{i}</a></li>)                
            }
            
        }
       return page
    
    }
    render(){ 
        if(this.props.loading){return <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{alignSelf:"center", marginTop:"200px"}}></i>}
        if(!this.props.products){return null}
        return(
            <div className="product-background">
            <React.Fragment>
               
                <div className="row">

{
    this.props.products.data.map(data => (

        <div className="col-sm-5 col-md-2 col-lg-3 mt-4"  key={data._id}>
        <div className="card">
           <a onClick={()=>window.open(`/productdetails/${data._id}`)} style={{textAlign:"center"}}><img className="card-img-top" src={data.image}/> </a>
           <div className="card-body">
                <p className="card-title">{data.brandName}{data.productName}</p>
                <h6 className="card-subtitle">₹{data.offerPrice}
                <span className="linethrough" style={{textDecoration:"line-through"}}>₹{data.price}</span>
                <span className="percentOff">{data.percentOff ? data.percentOff +"% Off" :null}</span>
                </h6>
                <h6 className="freedelivery">{data.shippingCharges ? "Delivery Charges: "+"₹"+data.shippingCharges:"FREE DELIVERY"}</h6>
              
           </div>
          
        </div>
        
    </div>
    
  
    ))
}


</div>

             
               
                
               <hr className="horizontalProductsLine" />
               {
                   this.props.products ? 
                   <>
                   <nav aria-label="Pagenavigationexample">
                    <ul className="pagination">
                        {
                            parseInt(this.props.match.params.pageNo) === 1 ? 
                            <li className="page-item">
                            <a className="page-link" aria-disabled="true"  aria-label="Previous">
                                <span aria-hidden="true">«</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>
                            :
                            
                            <li className="page-item">
                            <a className="page-link"  href={`/products/pageNo/pageNo=${parseInt(this.props.match.params.pageNo)-1}`} aria-label="Previous">
                                <span aria-hidden="true">«</span>
                                <span className="sr-only">Previous</span>
                            </a>
                            </li>
                        }
                       
                        {this.handlePagination(this.props.products.productPageNoLimit)}

                        {
                            parseInt(this.props.match.params.pageNo) === this.props.products.productPageNoLimit ?
                        
                            <li className="page-item">
                        <a className="page-link" aria-disabled="true" aria-label="Next">
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </a>
                        </li>
                        :
                        <li className="page-item">
                        <a className="page-link" href={`/products/pageNo/pageNo=${parseInt(this.props.match.params.pageNo)+1}`} aria-label="Next">
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
                   </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        products: state.productPagination.data,
        loading: state.productPagination.loading
    };
}

export default connect(mapStateToProps,{ FetchAllProductsAction,productPaginationAction, productDetailsAction })(Products);