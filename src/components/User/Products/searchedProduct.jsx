import React,{Component} from "react";
import { FetchAllProductsAction,productDetailsAction } from "../../../Store/actions/User/Products/productsAction";
import {connect} from "react-redux";
import "./searchedProduct.css";
import SearchProductPagination from "../../Pagination/searchProductPagination.jsx"
class SearchedProduct extends Component{

    componentDidMount = () => {
            this.props.FetchAllProductsAction();
           
            console.log(this.props.match.params);
        }
    
    render(){
        if(this.props.loading){return  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="spinner" style={{marginLeft:"50%", marginTop:"200px"}}></i>}
        console.log(this.props.match.params.data.toLowerCase().split(" "));

        const filterData=this.props.products ? this.props.products.data
        .filter(item=>(item.productName.toLowerCase().includes(this.props.match.params.data.toLowerCase())||item.productSubCategoryName.toLowerCase().includes(this.props.match.params.data.toLowerCase())
        ||item.brandName.toLowerCase().includes(this.props.match.params.data.toLowerCase())||item.brandName.concat(" " ,item.productSubCategoryName).toLowerCase().includes(this.props.match.params.data.toLowerCase())
        ||item.brandName.concat(" " ,item.productName).toLowerCase().includes(this.props.match.params.data.toLowerCase().split(" ")))): null;

        console.log(filterData);

        if(filterData===null|| filterData.length===0){return <h1>Not Found</h1>}
    return(
        <React.Fragment>
       <SearchProductPagination  product={filterData} value={this.props.match.params.data} pageNo={this.props.match.params.pageNo}/>
        </React.Fragment>
    )
}
}
const mapStateToProps = (state) =>{
    console.log(state);
return {
    
    loading:state.products.loading,
    products:state.products.data};
}
export default  connect(mapStateToProps,{FetchAllProductsAction,productDetailsAction})(SearchedProduct);