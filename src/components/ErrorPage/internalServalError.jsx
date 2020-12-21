import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./internalServerError.css";


const internalServerError = ({history}) => {
    return (
        <div className="ex-page-content bootstrap snippets bootdeys">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <svg className="svg-box" width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" > 
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" type="MSPage">
                                <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#3bafda" stroke-width="6" type="MSShapeGroup"></path>
                                <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#7266ba" stroke-width="6" type="MSShapeGroup"></path>
                                <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#f76397" stroke-width="6" type="MSShapeGroup"></path>
                                <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#00b19d" stroke-width="6" type="MSShapeGroup"></path>
                                <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#ffaa00" stroke-width="6" type="MSShapeGroup"></path>
                            </g >
                        </svg >
                    </div >

                    <div className="col-sm-6">
                        <div className="message-box">
                            <h1 className="m-b-0">500</h1>
                                <p>Internal Server Error.</p>
                                    <div className="buttons-con">
                                        <div className="action-link-wrap">
                                            <button className="btn btn-custom btn-info waves-effect waves-light m-t-20" style={{marginRight:"5px"}} onClick={history.goBack}>Go Back</button>
                                            <Link to="/home" className="btn btn-custom btn-info waves-effect waves-light m-t-20" style={{marginLeft:"5px"}}>Go to Home Page</Link>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default internalServerError;