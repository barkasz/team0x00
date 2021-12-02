import React, {Component} from 'react'
import './popup.css'

class PopupCreateUser extends Component {
    constructor() {
        super()
        this.state = {
            username : '',
            password : '',
        }
    }
    render() {
        const {title, text, handleClose} = this.props
        return (
            <div className="popup-lightbox">
                <div className="popup">
                    <h3>{title}</h3>
                    <p className="mb-3">{text}</p>
                        <input type="text" value={this.state.username} placeholder="Username" onChange={e => this.setState({username:e.target.value})} />
                        <input type="password" value={this.state.password}  placeholder="Password" onChange={e => this.setState({password:e.target.value})}/>
                    <button className="btn btn-outline" onClick={() => {
                        handleClose(false)
                    }}>No</button>
                    <button className="btn btn-primary"  onClick={() => {
                        handleClose(true, {"username":this.state.username, "password":this.state.password})
                    }}>Yes</button>
                </div>
            </div>
        )
    }
}

export default PopupCreateUser;