import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class CropImage extends React.Component {
  _crop(){
    // image in dataUrl
    this.props.setPreview(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    return (
      <Cropper
        ref='cropper'
        src={this.props.image}
        style={{height: 240, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 16}
        guides={false}
        crop={this._crop.bind(this)} />
    );
  }
};
