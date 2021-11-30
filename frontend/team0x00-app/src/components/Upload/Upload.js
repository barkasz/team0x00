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
          console.log(img)
          this.setState({
            image: img
          });
        }
      };
    
    sizeOf = function (bytes) {
        if (bytes == 0) { return "0.00 B"; }
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B';
    }

    render(){
        const file = React.createRef();
        function clickForwarder(){
            file.current.click();
        }
        return  (
            <form action="">
            <div className="upload">
                    <div className="warning">
                        <p>This is an example warning message.</p>
                    </div>
                    <div onClick={clickForwarder} className='selector bordered'>
                        <input type="file" accept='.caff' id='file' onChange={this.onImageChange} ref={file} style={{display: 'none'}}/>
                        <h3 className='subtle'>Click to select caff file</h3>
                        {this.state.image &&
                            <div className="file">
                                <h3>{this.state.image.name}</h3>
                                <p>{this.sizeOf(this.state.image.size)}</p>
                            </div>
                        }
                        
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