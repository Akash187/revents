import React, {useMemo, useState} from 'react';
import {Header, Icon} from "semantic-ui-react";
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  height: '240px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#383838',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#383838',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const ImageUpload = ({image, setImage}) => {

  const [imageUploadError, setImageUploadError] = useState(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    maxSize: 5242880,
    multiple: false,
    onDropAccepted: (File) => {
      setImageUploadError(null);
      let reader = new FileReader();
      reader.onload = function (e) {
        setImage(e.target.result);
      };
      reader.readAsDataURL(File[0]);
    },
    onDropRejected: () => {setImageUploadError('File should be Image and must not be more than 5MB size.')}
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <section>
      <div className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <Icon name='upload' size='huge'/>
          <Header size='large' textAlign='center'>Drop image here or click to add</Header>
        </div>
      </div>
      <aside>
        {imageUploadError && <p style={{color: 'red'}}>{imageUploadError}</p>}
      </aside>
    </section>
  );
};

export default ImageUpload;
