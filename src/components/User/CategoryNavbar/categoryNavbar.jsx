import React, { Component } from "react";
import { Navbar, Image, Form, FormControl, Button, Nav, Dropdown, ButtonGroup } from "react-bootstrap";
import "./categoryNavbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FetchMainCategoryAction } from "../../../Store/actions/Admin/Category/categoryAction";
import '../Home/latestProducts.css';
import history from "../../../Shared/History";

const columnsForMainCategory = (item) => {
    let total = parseInt(item.category.length + parseFloat(item.category.reduce((sum, item) => (
        sum + parseInt(item.subCat.length)), 0)) / 5)
    console.log(total);
    return total;
}

class CategoryNavigation extends Component {
   

    displayContent = (name) => {
        var x = document.getElementById(name)
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
    }
    componentDidMount = () => {
        this.props.FetchMainCategoryAction();
    }

    render() {
        // if (this.props.loading) {
        //     return <i className="fa fa-spinner fa-pulse fa-3x fa-fw"
        //         style={{ marginLeft: "50%", marginTop: "200px" }}></i>
        // }
        if (!this.props.mainCategory) { return null }

        return (
            <React.Fragment>
                <Navbar>


                    {this.props.mainCategory.data.map(item => (

                        <React.Fragment key={item._id}>
                            <Nav.Link onClick={() => this.displayContent(item.mainCategoryName)}>{item.mainCategoryName}<i className="fa fa-chevron-down"></i></Nav.Link>

                        </React.Fragment>

                    ))}
</Navbar>
                    {this.props.mainCategory.data.map(item => (



                        <div id={item.mainCategoryName} key={item._id} className="category" style={{ display: "none", columns: columnsForMainCategory(item)  }}>


                            {item.category.map(data => (
                                <React.Fragment key={data._id}>
                                    <Nav.Link id="categoryName" as={Link} to={`/productsByCategory/category/${data.categoryName}/pageNo/pageNo=1`} style={{color:"grey"}}><b>{data.categoryName}</b><i className="fa fa-chevron-down"></i></Nav.Link>
                                    <div>
                                        {data.subCat.map(item => (
                                            <React.Fragment key={item._id}>

                                                {item.subCat ? <div><Nav.Link id="categoryName" as={Link} to={`/productsBySubCategory/subCategory/${item.subCategoryName}/pageNo/pageNo=1`} onClick={()=>history.push(`/productsBySubCategory/subCategory/${item.subCategoryName}/pageNo/pageNo=1`)}>{item.subCategoryName}<i className="fa fa-chevron-down"></i></Nav.Link>
                                                    {item.subCat.map(data => (
                                                        <React.Fragment key={data._id}>
                                                            <Nav.Link id="categoryName" >{data.subCategoryName}</Nav.Link>
                                                        </React.Fragment>
                                                    ))} </div> :
                                                    <Nav.Link id="categoryName" as={Link} to={`/productsBySubCategory/subCategory/${item.subCategoryName}/pageNo/pageNo=1`} onClick={()=>history.push(`/productsBySubCategory/subCategory/${item.subCategoryName}/pageNo/pageNo=1`)}>{item.subCategoryName}</Nav.Link>}

                                            </React.Fragment>
                                        ))}
                                    </div>
                                </React.Fragment>
                            ))}


                        </div>

                    ))}


                

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {

        mainCategory: state.mainCategory.data,
        loading: state.mainCategory.loading,

    };

}
export default connect(mapStateToProps, { FetchMainCategoryAction })(CategoryNavigation);