import React, { useState, useEffect } from 'react'
import { API } from '../../api-service'
import randomProfilePic from "../../data/profile_pic";
import defaultProfilePic from "../../assets/default-user.png"
import { Link } from "react-router-dom";
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/trash.svg'
import adminIcon from '../../assets/admin.svg'
import Popup from '../Popup/Popup';

function Users(){
    const [deletePopup, setDeletePopup] = useState(false)
    const [adminPopup, setAdminPopup] = useState(false)
    const [userToEdit, setUserToEdit] = useState(null)
    const [users, setUsers] = useState([])
    const [fetchError, setFetchError] = useState(false) 

    const handleDeleteUserPopup = (resp) =>{
        if(resp) {
            API.deleteUser(userToEdit)
        }
        setDeletePopup(false)
    }

    const handleAdminPopup = (resp) =>{
        if(resp) {
            API.setAsAdmin(userToEdit)
        }
        setAdminPopup(false)
    }

    useEffect(() => {
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
                        <Link to={`/change-password/${user?.username}`}>
                        <div className="action-button">
                            <img src={editIcon} alt="" className='icon' />
                        </div>
                        </Link>
                        
                        <div className="action-button" onClick={() => setDeletePopup(true)}>
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