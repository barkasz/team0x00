import React, {Component} from 'react'
import './comment.css'
import randomProfilePic from '../../data/profile_pic'

class Comment extends Component{
    render(){
        const { comment } = this.props
        return (
             <div className='comment mb-3'>
                <img src={randomProfilePic()} className="profile-small" alt="Medium profile pic"/> 
                <p><span className='username'>{comment?.user?.username}</span> {comment?.content}</p>
            </div>
        )
    }
}
export default Comment