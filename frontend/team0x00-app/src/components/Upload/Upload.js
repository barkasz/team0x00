import React, { useState } from 'react'
import { API } from '../../api-service';
import { useHistory } from "react-router-dom";
import './upload.css'

function Upload({triggerRefresh}){

    const [image, setImage] = useState()
    const [title, setTitle] = useState('')
    const [warning, setWarning] = useState()
    const history = useHistory();
    
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          setImage(img);
        }
      };
    
    const sizeOf = function (bytes) {
        if (bytes == 0) { return "0.00 B"; }
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes/Math.pow(1024, e)).toFixed(2)+' '+' KMGTP'.charAt(e)+'B';
    }

    const file = React.createRef();

    const clickForwarder = () => {
        file.current.click();
    }

    const upload = async e => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', image, "asdas.caff")
        try {
            const caffResp = await API.uploadCaff(data)
            if (caffResp.id) {
                const postResp = await(API.post({ "title": title, "caff_id": caffResp.id }))
                if(postResp._id) {
                    triggerRefresh(['1'])
                    history.push('/')
                }
            }
        } catch (e){
            setWarning("Server side error: " + e.message)
        }
    }

    return  (
            <form onSubmit={upload} encType="multipart/form-data">
            <div className="upload">
                    { warning &&
                        <div className="warning">
                            <p>{warning}</p>
                        </div>
                    }
                    <div onClick={clickForwarder} className='selector bordered'>
                        <input type="file" name='file' onChange={onImageChange} ref={file} style={{display: 'none'}}/>
                        <h3 className='subtle'>Click to select caff file</h3>
                        {image &&
                            <div className="file">
                                <h3>{image?.name}</h3>
                                <p>{sizeOf(image?.size)}</p>
                            </div>
                        }
                        
                    </div>
                    <div className="upload-form-elements">
                        <h3 className='mt-0 mb-2'>Set image title</h3>
                        <input type="text" required minLength="3" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                        <button type='submit' className='btn btn-primary mt-1'>Upload</button>
                    </div>
            </div>
            </form>
         )
}

export default Upload