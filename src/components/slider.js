import React, { Component } from 'react';
import axios from "axios";
import { BackArrow, NextArrow } from './arrowFunctionSlider';


class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCount: 0,
      photos: []
      
    }
  }

  componentWillMount() {
    this.fetchPhotos();
  }

  nextImage=()=> {
    this.setState({ slideCount: this.state.slideCount + 1 })
  }

  previousImage=()=> {
    console.log(this.state.slideCount);
    this.setState({ slideCount: this.state.slideCount - 1 })
  }

  async fetchPhotos() {
    let response = await axios.get('http://localhost:4500/api/product/allproduct')

    this.setState({
      photos: response.data.data,
    })

  }

  
  render() {
    return (
      <React.Fragment>
        <div>
            <div style={{ display:'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
              {this.state.slideCount !== 0 ? <BackArrow previousImage={this.previousImage} /> : ""}
              {this.state.photos.map((photo, key) => {
                if (this.state.photos.indexOf(photo) === this.state.slideCount) {
                  return (
                    <div key={photo._id} >
                      <img src={photo.image} alt={photo.caption} style={{height:"300px",width:"100%"}}/>
                      <div style={{ width: '600px', margin: '24px auto', fontStyle: 'italic' }}>
                        {photo.brandName !== null ? photo.brandName : ''}
                        {photo.productName !== null ? photo.productName : ""}

                      </div>
                    </div>
                  )
                }
                return ""
              })}
              {console.log(this.state.photos.length)}
              {this.state.slideCount !== (this.state.photos.length - 1) ? <NextArrow nextImage={this.nextImage} /> : ""} </div>
          </div>
        

      </React.Fragment>

    );
  }
}

export default Slider;