import React, {Component} from 'react'
import '../AddUser/adduser.css'
import { withRouter } from "react-router";
import _users from '../../data/users'
import randomProfilePic from '../../data/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'

class ChangePassword extends Component {

    findUser(id) {
        return _users.find(user => user.id === id)
    }

    render() {
        const { id } = this.props.match.params
        const  user = this.findUser(id)
        return (
            <form action="">
            <div className="add-user">
                    <div className="add-user-form-elements">
                        <div className="author-bar mb-3">
                            <div className="profile profile-medium">
                                <img src={randomProfilePic()} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}} alt="Profile pic" />
                            </div>
                            <div className="info">
                                <p>{user?.username || 'Unknown'}</p>
                            </div>
                        </div>
                        <input type="password" placeholder="New password" />
                        <input type="password" placeholder="Repeat password" />
                        <button type='submit' className='btn btn-primary mt-1 w-100'>Save</button>
                    </div>
            </div>
            </form>
        )
    }
}

export default withRouter(ChangePassword)