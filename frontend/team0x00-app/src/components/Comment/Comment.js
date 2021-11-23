import React, {Component} from 'react'
import './comment.css'
import profile from '../../assets/profile.webp'

class Comment extends Component{
    render(){
        const { comment } = this.props
        return (
             <div className='comment mb-3'>
                <img src={comment?.user?.profile || profile} className="profile-small" alt="Medium profile pic"/> 
                <p><span className='username'>{comment?.user?.username}</span> {comment?.content}</p>
            </div>
        )
    }
}
export default Comment