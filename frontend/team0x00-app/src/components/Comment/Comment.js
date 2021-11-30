import React, {Component} from 'react'
import './comment.css'
import randomProfilePic from '../../data/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'

class Comment extends Component{
    render(){
        const { comment } = this.props
        return (
             <div className='comment mb-3'>
                <img src={randomProfilePic()} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}}  className="profile-small" alt="Medium profile pic"/> 
                <p><span className='username'>{comment?.user?.username}</span> {comment?.content}</p>
            </div>
        )
    }
}
export default Comment