import React, { useState } from 'react'
import './comment.css'
import randomProfilePic from '../../services/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'

function Comment(props){
    const [profilePic] = useState(randomProfilePic())
    const { comment } = props
    return (
             <div className='comment mb-3'>
                <img src={profilePic} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}}  className="profile-small" alt="Medium profile pic"/> 
                <p><span className='username'>{comment?.user?.username}</span> {comment?.content}</p>
            </div>
    )
}
export default Comment