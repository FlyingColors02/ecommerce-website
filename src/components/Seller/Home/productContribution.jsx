import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { FetchSellerProductsAction, RemoveProductAction } from "../../../Store/actions/Seller/Product/productAction";
import "./productContribution.css";
import { productDetailsAction } from "../../../Store/actions/User/Products/productsAction";
import { SellLoggedInAction } from "../../../Store/actions/Seller/Authentication/sellerAuthenticationAction";
import { ViewSellerOrderAction } from "../../../Store/actions/Seller/Order/orderAction";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }

    }
    onClickUpdate = (id) => {

        this.props.productDetailsAction(id);
        const product = this.props.products.data.filter(data => data._id === id);
        console.log(product);
        this.setState({ product: product });
        this.props.history.push({
            pathname: `/product/update/${id}`,
            state: { product: product }
        });
        this.setState({ isEditing: true });

    }
    componentDidMount() {
        this.props.SellLoggedInAction();
        this.props.FetchSellerProductsAction(this.props.match.params.pageNo);
        this.props.ViewSellerOrderAction();
    }
    handleHighlights = (description) => {
        return description.split(/[\n\r]/g).join(`\n • `);
    }
    handlePagination = (pageNo) => {
        let page = [];
        console.log("hii");
        console.log(this.props.products.productPageNoLimit)
        for (var i = 1; i <= pageNo; i++) {
            if (parseInt(this.props.match.params.pageNo) === i) {
                console.log("hii");
                page.push(<li className="page-item active" key={i}><a className="page-link" href={`/seller/ProductContribution/pageNo=${i}`}>{i}</a></li>)
            }
            else {
                page.push(<li className="page-item" key={i}><a className="page-link" href={`/seller/ProductContribution/pageNo=${i}`}>{i}</a></li>)
            }

        }
        return page

    }

    render() {

        if (this.props.loading) {
            return (
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ alignSelf: "center", marginTop: "200px" }}></i>)
        }
        if (!this.props.products) {
            return (
                <h5>No Contribution Till Date.</h5>)
        }

        return (

            <React.Fragment>
                {this.props.loggedInSeller ?
                    <h5 style={{ marginLeft: "50px" }}>Hii, {this.props.loggedInSeller.data.userName}</h5>
                    : null
                }
                <h6 style={{ marginLeft: "100px" }}>We thank You for the following contributions to amYflip.</h6>

                {
                    this.props.products.data.map(data => (
                        <div key={data._id}>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-12 mt-12" >
                                    <div className="card" style={{ padding: "30px",borderStyle:"groove" }}>

                                       
                                        <div className="card-body" >
                                            <div className="row">
                                                <div className="col-3">
                                                <img className="card-img-contribution" src={data.image} />
                                                <div >
                                            <button type="button" className="btn btn-group btn-primary" onClick={() => this.onClickUpdate(data._id)} style={{ marginLeft: "20px" }}>UPDATE</button>
                                            <button type="button" className="btn btn-group btn-danger" style={{ marginLeft: "10px" }} onClick={() => this.props.RemoveProductAction(data._id)}>REMOVE</button>
                                        </div>
                                                </div>
                                           
                                                <div className="col-3">
                                                    <p className="card-title-sell">{data.brandName} {data.productName}</p>
                                                    <h6 className="card-subtitle">₹{data.offerPrice}
                                                        <span className="linethrough" style={{ textDecoration: "line-through" }}>₹{data.price}</span>
                                                        <span className="percentOff">{data.percentOff ? data.percentOff + "% Off" : null}</span>
                                                    </h6>
                                                    <br />
                                                    <h6>STOCK: {data.stock}</h6>
                                                    <h6 className="freedelivery">{data.offerPrice >= 500 ? "FREE DELIVERY" : "SHIPPING CHARGES: " + data.shippingCharges}</h6>
                                                    <p>Category : {data.mainCategoryName ? data.mainCategoryName + "> " + data.productCategoryName + "> " + data.productSubCategoryName : null} </p>

                                                </div>
                                                <div className="col-6">
                                                <div className="card-body" >
                                            <h6>Description:</h6>
                                            <p style={{height:"230px",overflow:"scroll"}}>• {data.description},{this.handleHighlights(data.description)}</p>

                                        </div>

                                       

                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>


                                </div>
                            </div>
                            
                        </div>

                    ))
                }

                {
                    this.props.products ?
                        <>
                            <nav aria-label="Pagenavigationexample">
                                <ul className="pagination">
                                    {
                                        parseInt(this.props.match.params.pageNo) === 1 ?
                                            <li className="page-item">
                                                <a className="page-link" aria-disabled="true" aria-label="Previous">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            :

                                            <li className="page-item">
                                                <a className="page-link" href={`/seller/ProductContribution/pageNo=${parseInt(this.props.match.params.pageNo) - 1}`} aria-label="Previous">
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
                                                <a className="page-link" href={`/seller/ProductContribution/pageNo=${parseInt(this.props.match.params.pageNo) + 1}`} aria-label="Next">
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

const mapStateToProps = (state) => {
    console.log(state);
    return {
        loggedInSeller: state.loggedInSeller.data,
        products: state.sellerProducts.data,
        loading: state.sellerProducts.loading,
        productDetails: state.productDetails.data,
    };
}

export default connect(mapStateToProps, { FetchSellerProductsAction, productDetailsAction, RemoveProductAction, SellLoggedInAction, ViewSellerOrderAction })(Products);