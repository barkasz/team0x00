import React, { useState, useEffect } from 'react'
import { API } from '../../api-service'
import randomProfilePic from "../../data/profile_pic";
import defaultProfilePic from "../../assets/default-user.png"
import { Link } from "react-router-dom";
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/trash.svg'
import adminIcon from '../../assets/admin.svg'
import Popup from '../Popup/Popup';
import Popup_ChangePassword from '../Popup/Popup_ChangePassword';

function Users(){
    const [deletePopup, setDeletePopup] = useState(false)
    const [adminPopup, setAdminPopup] = useState(false)
    const [changePasswordPopup, setChangePasswordPopup] = useState(false)
    const [userToEdit, setUserToEdit] = useState(null)
    const [users, setUsers] = useState([])
    const [fetchError, setFetchError] = useState(false) 

    const handleDeleteUserPopup = async (resp) =>{
        if(resp) {
            const delete_response = await API.deleteUser(userToEdit)
            if (delete_response["status"] === 'USER_SUCCESSFULLY_DELETED'){
                fetchUsers()
            }
        }
        setDeletePopup(false)
    }

    const handleAdminPopup = async (resp) =>{
        if(resp) {
            const setasadmin_response = await API.setAsAdmin(userToEdit)
            if (setasadmin_response["status"] === 'PERMISSION_GRANTED'){
                fetchUsers()
            }
        }
        setAdminPopup(false)
    }

    const handleChangePasswordPopup = async (resp, newpw) =>{
        if(resp) {
            const changepassword_response = await API.changePassword(userToEdit, newpw)
            console.log(changepassword_response)
        }
        setChangePasswordPopup(false)
    }

    async function fetchUsers(){
        const res = await API.getAllUsers() 
        setUsers(res)
        if (res instanceof Array) {
            setFetchError(false)
        } else {
            setFetchError(true)
        }
        console.log(res)
    }

    useEffect(() => {
        try {
            fetchUsers()
        } catch (e) {
            setFetchError(true)
        }
    }, [])

    return (
        <>
        {deletePopup && 
            <Popup title={"Deleting User"} 
                text={"Are you sure you want to delete this user?"} 
                handleClose={handleDeleteUserPopup}
            /> 
        }
        {adminPopup && 
            <Popup title={"Set as Admin"} 
                text={"Are you sure you want to set this user as admin?"} 
                handleClose={handleAdminPopup}
            /> 
        }
        {changePasswordPopup && 
            <Popup_ChangePassword title={"Change password"} 
                text={"Are you sure you want to change password?"} 
                handleClose={handleChangePasswordPopup}
            /> 
        }

        <Link to='/add-user' className='btn btn-primary mb-3' style={{ width: 'fit-content'}}>Create User</Link>

         {
           users?.map(user => (
            <div className="author-bar mb-3">
                <div className="profile profile-medium">
                    <img src={randomProfilePic()} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}} alt="Profile pic" />
                </div>
                <div className="info">
                    <p>{user?.username || 'Unknown'}</p>
                </div>
                <div className="actions">
                        { !user?.admin && 
                            <div className="action-button" onClick={() => { setAdminPopup(true); setUserToEdit(user); }}>
                                <img src={adminIcon} alt="" className='icon'/>
                            </div>
                        }

                        <div className="action-button"  onClick={() => { setChangePasswordPopup(true); setUserToEdit(user); }}>
                            <img src={editIcon} alt="" className='icon' />
                        </div>
                        
                        <div className="action-button" onClick={() => {setDeletePopup(true);  setUserToEdit(user); }}>
                            <img src={deleteIcon} alt="" className='icon'/>
                        </div>
                </div>
            </div>
           ))
         }
        </>
    )
}

export default Users