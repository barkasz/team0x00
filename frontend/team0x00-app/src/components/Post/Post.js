import React, {Component} from 'react'
import './post.css'
import Comment from '../Comment/Comment'
import pic from '../../assets/tea.webp'
import commentIcon from '../../assets/comment.svg'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/trash.svg'

import _comments from '../../data/comments'

class Post extends Component {
    getComments(idList){
        return _comments.filter(comment => idList.includes(comment.id))
    }

    render() {
        const { post, currentUser } = this.props 
        const comments = this.getComments(post.comment_ids)
        return ( <div className='post'>
            {currentUser?.admin &&
                <div className="action-button delete-post">
                    <img src={deleteIcon} className='icon' alt="" />
                </div>
            }

            <img src={post?.image || pic} className="post-img" alt={post?.title || 'Posted pic'}/>
            <div className="post-info">
                <h2>{post?.title || 'No title'}</h2>
                <div className="author-bar mb-3">
                    <div className="profile profile-medium">
                        <img src={post?.user?.profile || pic} alt="Poster's profile pic"/> 
                    </div>
                    <div className="info">
                        <p>{post?.user?.username || 'Unknown'}</p>
                        <p className="subtle">{post?.user?.email || 'Unknonw email'}</p>
                    </div>
                    { currentUser?.admin && 
                    <div className="actions">
                        <div className="action-button">
                            <img src={editIcon} alt="" className='icon' />
                        </div>
                        <div className="action-button">
                            <img src={deleteIcon} alt="" className='icon' />
                        </div>
                    </div>
                    }
                </div>
                <div className="comment-section">
                    <div className="comments">
                        {
                            comments?.map(comment => (<Comment key={comment.id} comment={comment}/>))
                        }
                    </div>
                    
                    <div className="write w-100">
                        <div className="input-with-icon w-100">
                            <img src={commentIcon} alt="Comment icon" className="icon"/>
                            <input type="text" className='w-100' placeholder="Write a comment here..."/>
                        </div>
                        <button className='btn btn-small'>Send</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default Post