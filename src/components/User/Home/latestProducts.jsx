import React, { Component } from 'react';
import {connect} from "react-redux";
import { latestProductsAction, productDetailsAction} from "../../../Store/actions/User/Products/productsAction";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";  
import Slider from "react-slick";  
import './latestProducts.css';  


export class LatestProducts extends Component {  
  constructor(props){
    super(props);
  }


  componentDidMount = () =>{
    
    this.props.latestProductsAction();
    console.log("hii");
  }
    render() {  
        if(this.props.loading){ return<i className="fa fa-spinner fa-pulse fa-3x fa-fw" 
        style={{marginLeft:"45%", marginTop:"200px"}}></i>}
        if(!this.props.latestProducts){return null}

  
  return (  
    <div className="App">  
         {/* <div className='container-fluid'>         */}
            <div className="row-title" >        
            <div className="col-sm-12">        
             <h4 style={{marginBottom:"25px"}}> Latest Products</h4>     
            </div>        
            </div>    
            {/* </div>   */}
      <Slider    
        slidesToShow={4}  
        slidesToScroll={3}  
        autoplay={false}  
        arrows={true} 
        infinite={false}
        autoplaySpeed={2000}>{

           this.props.latestProducts.data.map(item => (  
          <div className="imgpad" style={{width:"60%", textAlign:"center", alignItems:"center"}} key={item._id}>  
            <a style={{textAlign:"center"}} className="onclick-productdetails" onClick={()=>window.open(`/productdetails/${item._id}`)}>
              <img className="imgdetails" style={{textAlign:"center", marginLeft:"15%"}} src= {item.image} /> </a>  
            <h6>{item.brandName} {item.productName}</h6> 
          </div>  

        ))}</Slider>  
    </div>  
  );  
}  
} 

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loading: state.latestProducts.loading,
    latestProducts: state.latestProducts.data};
}
export default connect(mapStateToProps,{latestProductsAction, productDetailsAction})(LatestProducts); 