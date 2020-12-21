import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AddCategoryAction, AddSubCategoryAction, FetchMainCategoryAction, FetchCategoryAction, FetchSubCategoryAction,AddMainCategoryAction } from "../../../Store/actions/Admin/Category/categoryAction";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import simpleReactValidator from "simple-react-validator";

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subcategory:[{
                subCategoryName: "",
            }],
            categoryName: "",
            subCat: [{
                subCategoryName: ""
            }],
            mainCategoryName: "",
            category: [{
                categoryName: ""
            }]
        }
        this.validator = new simpleReactValidator({ autoForceUpdate: this });
    }

    displayContent = (name) => {
        var x = document.getElementById(name)
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        else {
            x.style.display = "none";
        }
    }

    handleSubCategoryForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                subcategory: this.state.subcategory
            }
            this.props.AddSubCategoryAction(data)
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            console.log("error in handle Sub-category")
        }
    }

    handleCategoryForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                categoryName: this.state.categoryName,
                subCat: this.state.subCat
            }
            this.props.AddCategoryAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            console.log("error in handle category")
        }
    }

    handleMainCategoryForm = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            let data = {
                mainCategoryName: this.state.mainCategoryName,
                category: this.state.category
            }
            console.log(data);
            this.props.AddMainCategoryAction(data);
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
            console.log("error in handle main category")
        }
    }
    handleInputData = (event) => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);

    }

    componentDidMount = () => {
        this.props.FetchMainCategoryAction();
        this.props.FetchCategoryAction();
        this.props.FetchSubCategoryAction();
        console.log("in component did mount")
    }

    // handle input change
    handleInputChange = (e, index, array) => {

        const list = [...array];
        list[index][e.target.name] = e.target.value;
        this.setState({ list });
        console.log("change category name", index, this.state);
    };

    // handle click event of the Remove button
    handleRemoveClick = (index, array) => {
        console.log(index)
        const list = [...array];
        list.splice(index, 1);
        this.setState(list);
        console.log(list);
        array.splice(index, 1);
        console.log("remove sub-cat", this.state);
    };

    // handle click event of the Add button
    handleAddSubCatClick = () => {
        this.setState([...this.state.subCat, { subCategoryName: "" }]);
        // const list = [...this.state.subCat]
        // list.push({subCategoryName:""});
        // this.setState(list);
        this.state.subCat.push({ subCategoryName: "" });

        console.log("add sub-cat box", this.state);
    };

    handleAddCategoryClick = () => {
        this.setState([...this.state.category, { categoryName: "" }]);
        // const list = [...this.state.subCat]
        // list.push({subCategoryName:""});
        // this.setState(list);
        this.state.category.push({ categoryName: "" });

        console.log("add sub-cat box", this.state);
    };

    handleAddSubCategoryClick = () => {
        this.setState([...this.state.subcategory, { subCategoryName: "" }]);
        // const list = [...this.state.subCat]
        // list.push({subCategoryName:""});
        // this.setState(list);
        this.state.subcategory.push({ subCategoryName: "" });

        console.log("add sub-category box", this.state);
    };

    render() {
        if(this.props.addCategory){return <div><h2 style={{color:"green", marginLeft:"33%", marginTop:"10%"}}>{this.props.addCategory.message}</h2>
        <button className="btn btn-outline-primary" style={{alignSelf:"center", marginLeft:"45%"}}onClick={()=>window.location.reload()}>Back</button></div>}
        console.log("render", this.state)
        if (this.props.loading) {
            return <i className="fa fa-spinner fa-pulse fa-3x fa-fw"
                style={{ marginLeft: "50%", marginTop: "200px" }}></i>
        }
        if (!this.props.mainCategory) { return null }
       
        return (
            <React.Fragment>


                <div className="registration-sell">
                    <div className="container">
                        <div className="registration-sell-form">
                            <img src={require("../../../assets/amYflipLogo.png")} alt="logo" />
                            <div className="row row-cols-1">
                                <div className="col-7">
                                    <div className="col-md-12">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h6 style={{ textAlign: "left" }} onClick={() => this.displayContent("subCategory")}>ADD SUB-CATEGORY</h6>

                                                {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                            </div>

                                            <form id="subCategory" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleSubCategoryForm}>
                                                <hr className="horizontalLine-update" />
                                                <div className="row">
                                                    <div className="col-8">

                                                        <div className="form-group">
                                                            {this.state.subcategory.map((x, i) => {

                                                                return (
                                                                    <div className="row" key={i}>
                                                                        <div className="col-9" >
                                                                           
                                                                                <div className="form-group">
                                                                                    <input type="text" className="registration-sell-input" placeholder="Sub-Category Name"  name="subCategoryName" value={x.subCategoryName} onChange={event=>this.handleInputChange(event,i, this.state.subcategory)}/>
                                                                                        
                                                                                    {this.validator.message("subCategoryName", this.state.subCategoryName, "alpha_space")}
                                                                                </div>
                                                                                
                                                                                                                                    </div>
                                                                        <div className="col-3">
                                                                            {this.state.subcategory.length !== 1 && <button type="button" style={{ border: "0px" }} onClick={() => this.handleRemoveClick(i,this.state.subcategory)}><i style={{ color: "red" }} className="fa fa-trash-o"></i></button>}
                                                                            {this.state.subcategory.length - 1 == i && <button type="button" style={{ marginLeft: "2px", border: "0px" }} onClick={this.handleAddSubCategoryClick}><i className="fa fa-plus-circle"></i></button>}

                                                                        </div>


                                                                    </div>



                                                                )
                                                            })}

                                                        </div>

                                                    </div>
                                                    <div className="col-4">
                                                        {this.state.subcategory[0].subCategoryName ?
                                                            <button type="submit" className="registration-sell-button">Add</button>
                                                            : <button type="submit" disabled={true} style={{ opacity: "0.4" }} className="registration-sell-button">Add</button>
                                                        }

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h6 style={{ textAlign: "left" }} onClick={() => this.displayContent("category")}>ADD CATEGORY</h6>

                                                {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                            </div>

                                            <form id="category" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleCategoryForm}>
                                                <hr className="horizontalLine-update" />
                                                <div className="row">
                                                    <div className="col-9">
                                                        <div className="form-group">
                                                            <input type="text" className="registration-sell-input" name="categoryName"
                                                                placeholder="Category Name" value={this.state.categoryName} onChange={this.handleInputData} />
                                                            {this.validator.message("categoryName", this.state.categoryName, "alpha_space|min:4")}
                                                        </div>
                                                        <div className="form-group">
                                                            {this.state.subCat.map((x, i) => {

                                                                return (
                                                                    <div className="row" key={i}>
                                                                        <div className="col-9" >
                                                                            {this.props.subCategory ?
                                                                                <div className="form-group">
                                                                                    <select className="CategorySelect" name="subCategoryName" value={x.subCategoryName} onChange={event=>this.handleInputChange(event,i, this.state.subCat)}>
                                                                                        <option value="select Sub-Category">Please Select Product Sub-Category</option>
                                                                                        {this.props.subCategory.data.map(item => (<option key={item._id} value={item.subCategoryName}>{item.subCategoryName}</option>))}
                                                                                    </select>
                                                                                    {this.validator.message("subCategoryName", this.state.subCategoryName, "string")}
                                                                                </div>
                                                                                : null}
                                                                                                                                    </div>
                                                                        <div className="col-3">
                                                                            {this.state.subCat.length !== 1 && <button type="button" style={{ border: "0px" }} onClick={() => this.handleRemoveClick(i,this.state.subCat)}><i style={{ color: "red" }} className="fa fa-trash-o"></i></button>}
                                                                            {this.state.subCat.length - 1 == i && <button type="button" style={{ marginLeft: "2px", border: "0px" }} onClick={this.handleAddSubCatClick}><i className="fa fa-plus-circle"></i></button>}

                                                                        </div>


                                                                    </div>



                                                                )
                                                            })}

                                                        </div>

                                                    </div>
                                                    <div className="col-3">
                                                        {this.state.subCat[0].subCategoryName ?
                                                            <button type="submit" className="registration-sell-button">Add</button>
                                                            : <button type="submit" disabled={true} style={{ opacity: "0.2" }} className="registration-sell-button">Add</button>
                                                        }

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                         
                                    <div className="col-md-12">
                                        <div className="main-div registration-sell">
                                            <div className="panel">
                                                <h6 style={{ textAlign: "left" }} onClick={() => this.displayContent("mainCategory")}>ADD MAIN CATEGORY</h6>

                                                {/* {this.props.errormessage ? <p className="error-message">{this.props.errormessage.message}</p> : null} */}
                                            </div>

                                            <form id="mainCategory" style={{ display: "none", marginTop: "25px" }} onSubmit={this.handleMainCategoryForm}>
                                                <hr className="horizontalLine-update" />
                                                <div className="row">
                                                    <div className="col-9">
                                                        <div className="form-group">
                                                            <input type="text" className="registration-sell-input" name="mainCategoryName"
                                                                placeholder="Main Category Name" value={this.state.mainCategoryName} onChange={this.handleInputData} />
                                                            {this.validator.message("mainCategoryName", this.state.mainCategoryName, "alpha_space|min:4")}
                                                        </div>
                                                        <div className="form-group">
                                                            {this.state.category.map((x, i) => {

                                                                return (
                                                                    <div className="row" key={i}>
                                                                        <div className="col-9" >
                                                                            {this.props.category ?
                                                                                <div className="form-group">
                                                                                    <select className="CategorySelect" name="categoryName" value={x.categoryName} onChange={event=>this.handleInputChange(event,i, this.state.category)}>
                                                                                        <option value="select Category">Please Select Product Category</option>
                                                                                        {this.props.category.data.map(item => (<option key={item._id} value={item.categoryName}>{item.categoryName}</option>))}
                                                                                    </select>
                                                                                    {this.validator.message("categoryName", this.state.categoryName, "string")}
                                                                                </div>
                                                                                : null}
                                                                                                                                    </div>
                                                                        <div className="col-3">
                                                                            {this.state.category.length !== 1 && <button type="button" style={{ border: "0px" }} onClick={() => this.handleRemoveClick(i,this.state.category)}><i style={{ color: "red" }} className="fa fa-trash-o"></i></button>}
                                                                            {this.state.category.length - 1 == i && <button type="button" style={{ marginLeft: "2px", border: "0px" }} onClick={this.handleAddCategoryClick}><i className="fa fa-plus-circle"></i></button>}

                                                                        </div>


                                                                    </div>



                                                                )
                                                            })}

                                                        </div>

                                                    </div>
                                                    <div className="col-3">
                                                        {this.state.category[0].categoryName ?
                                                            <button type="submit" className="registration-sell-button">Add</button>
                                                            : <button type="submit" disabled={true} style={{ opacity: "0.2" }} className="registration-sell-button">Add</button>
                                                        }

                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-5">
                                    
                                          <img style={{height:"430px", width:"110%"}} src={require("../../../assets/category.png")}/>              
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        addCategory: state.addCategory.data,
        mainCategory: state.mainCategory.data,
        loading: state.mainCategory.loading,
        subCategory: state.subCategory.data,
        category:state.category.data
    };

}
export default connect(mapStateToProps, { AddSubCategoryAction,AddMainCategoryAction, AddCategoryAction, FetchCategoryAction, FetchSubCategoryAction, FetchMainCategoryAction })(AddCategory);