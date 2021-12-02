import React, {Component} from 'react'
import './popup.css'

class Popup extends Component {
    render() {
        const {title, text, handleClose} = this.props
        return (
            <div className="popup-lightbox">
                <div className="popup">
                    <h3>{title}</h3>
                    <p className="mb-3">{text}</p>
                    <button className="btn btn-outline" onClick={() => {
                        handleClose(false)
                    }}>No</button>
                    <button className="btn btn-primary"  onClick={() => {
                        handleClose(true)
                    }}>Yes</button>
                </div>
            </div>
        )
    }
}

export default Popup;