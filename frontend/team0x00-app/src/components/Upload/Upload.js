import React, {Component} from 'react'
import './upload.css'

class Upload extends Component {

    constructor(){
        super()
        this.state = {
            image: null
        }
        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
        }
      };

    render(){
        const file = React.createRef();
        function clickForwarder(){
            file.current.click();
        }
        return  (
            <form action="">
            <div className="upload">
                    <div onClick={clickForwarder} className={`selector ${!this.state.image ? "bordered" : ""}`}>
                        {this.state.image && <img src={this.state.image} alt="" />}
                        <input type="file" id='file' onChange={this.onImageChange} ref={file} style={{display: 'none'}}/>
                        {!this.state.image && <h3 className='subtle'>Click to select image</h3>}
                    </div>
                    <div className="upload-form-elements">
                        <h3 className='mt-0 mb-2'>Set image title</h3>
                        <input type="text" placeholder="Title" />
                        <button type='submit' className='btn btn-primary mt-1'>Upload</button>
                    </div>
            </div>
            </form>
         )
    }

    

}

export default Upload