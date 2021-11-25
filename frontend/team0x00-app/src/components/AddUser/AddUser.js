import React, {Component} from 'react'
import './adduser.css'

class AddUser extends Component {
    render() {
        const {title, text, handleClose} = this.props
        return (
            <form action="">
            <div className="add-user">
                    <div className="add-user-form-elements">
                        <h3 className='mt-0 mb-2'>Register User</h3>
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="E-mail" />
                        <input type="password" placeholder="Password" />
                        <div className="form-group checkbox">
                            <input type="checkbox" id="admin" name="admin"/>
                            <label for="admin"> Register as admin</label>
                        </div>
                        <button type='submit' className='btn btn-primary mt-1 w-100'>Register</button>
                    </div>
            </div>
            </form>
        )
    }
}

export default AddUser