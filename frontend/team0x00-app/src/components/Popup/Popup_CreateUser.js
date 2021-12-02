import React, {Component} from 'react'
import './popup.css'

class Popup_CreateUser extends Component {
    constructor() {
        super()
        this.state = {
            username : '',
            password : '',
            admin_checked: false,
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
                        <div className="form-group checkbox">
                            <input type="checkbox" id="admin" name="admin" defaultChecked={this.state.admin_checked} onChange={() => this.setState({admin_checked : !this.state.admin_checked})}/>
                            <label for="admin"> Register as admin</label>
                        </div>
                    <button className="btn btn-outline" onClick={() => {
                        handleClose(false)
                    }}>No</button>
                    <button className="btn btn-primary"  onClick={() => {
                        handleClose(true, {"username":this.state.username, "password":this.state.password, "isadmin":this.state.admin_checked})
                    }}>Yes</button>
                </div>
            </div>
        )
    }
}

export default Popup_CreateUser;