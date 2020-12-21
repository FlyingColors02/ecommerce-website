import React from "react";
import withAutoPlay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from 'react-awesome-slider'; 
import "react-awesome-slider/dist/styles.css";
import "./sliderAutoPlay.css";

const AutoplaySlider = withAutoPlay(AwesomeSlider)

const SliderAuto = ()=>{
  return(
<AutoplaySlider
    play={true}
    cancelOnInteraction={false}
    interval={3000}
  >
    
    <div data-src={require("../../../assets/freestocks-VFrcRtEQKL8-unsplash.jpg")} />
    <div data-src={require("../../../assets/abc.jpg")} />
    <div data-src={require("../../../assets/christmas-shopping-bags-picjumbo-com.jpg")} />
    <div data-src={require("../../../assets/hand-holding-shopping-bags-plain-background_23-2148286215.jpg")} />
    <div data-src={require("../../../assets/jacek-dylag-jo8C9bt3uo8-unsplash.jpg")} />
    
    
  </AutoplaySlider>
);

  }

 export default SliderAuto;
 
