import React from "react";

export const BackArrow = (props) => {
    console.log(props)
    return(
     
<div onClick={props.previousImage} style={{fontSize: '2em', marginRight: '12px'}}>
      <i className="fa fa-angle-left fa-2x" aria-hidden="true"></i>
    </div>
    )
    
    }
  
 export  const NextArrow = (props) => {
     return(
        <div onClick={props.nextImage} style={{fontSize: '2em', marginLeft: '12px'}}>
        <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
      </div>
     )
   
 }