import React, {Component} from 'react'
import './popup.css'

class Popup_ChangePassword extends Component {
    constructor() {
        super()
        this.state = {
            newpassword: '',
        }
    }
    render() {
        const {title, text, handleClose} = this.props
        return (
            <div className="popup-lightbox">
                <div className="popup">
                    <h3>{title}</h3>
                    <p className="mb-3">{text}</p>
                    <input type="password" required minLength="4" value={this.state.newpassword} placeholder="New password" onChange={e => this.setState({newpassword:e.target.value})}/>
                    <button className="btn btn-outline" onClick={() => {
                        handleClose(false)
                    }}>No</button>
                    <button className="btn btn-primary"  onClick={() => {
                        handleClose(true, this.state.newpassword)
                    }}>Yes</button>
                </div>
            </div>
        )
    }
}

export default Popup_ChangePassword;