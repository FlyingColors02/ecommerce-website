import React, { Component } from "react";
import Slider from "./sliderAutoPlay";
import { connect } from "react-redux";
import "./home.css";
import { LoggedInAction} from "../../../Store/actions/User/Authentication/authenticationAction";
import LatestProducts from "./latestProducts";
import { FetchMainCategoryAction } from "../../../Store/actions/Admin/Category/categoryAction";


class Home extends Component{
    componentDidMount(){
        this.props.LoggedInAction();
        this.props.FetchMainCategoryAction();
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="main-container">
                <Slider/>
                <LatestProducts {...this.props}/>
                </div>
                
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return state;
}
export default connect(mapStateToProps, { LoggedInAction,FetchMainCategoryAction })(Home);