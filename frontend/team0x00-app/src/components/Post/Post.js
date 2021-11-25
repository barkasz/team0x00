import React, {Component} from 'react'
import './post.css'
import Comment from '../Comment/Comment'
import pic from '../../assets/tea.webp'
import commentIcon from '../../assets/comment.svg'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/trash.svg'
import Popup from '../Popup/Popup'
import _comments from '../../data/comments'

class Post extends Component {

    constructor(){
        super()
        this.handleDeletePostPopup = this.handleDeletePostPopup.bind(this)
        this.handleDeleteUserPopup = this.handleDeleteUserPopup.bind(this)
        this.toggleDeleteUserPopup = this.toggleDeleteUserPopup.bind(this)
        this.toggleDeletePostPopup = this.toggleDeletePostPopup.bind(this)
        this.state = {
            deletePostPopup: false,
            deleteUserPopup: false
        }
    }

    handleDeletePostPopup(resp){
        if(resp) {
            // TODO delete user
        }
        this.toggleDeletePostPopup()
    }

    handleDeleteUserPopup(resp){
        if(resp) {
            // TODO delete user
        }
        this.toggleDeleteUserPopup()
    }

    toggleDeletePostPopup(){
        this.setState({
            deletePostPopup: !this.state.deletePostPopup
        })
    }

    toggleDeleteUserPopup(){
        this.setState({
            deleteUserPopup: !this.state.deleteUserPopup
        })
    }

    getComments(idList){
        return _comments.filter(comment => idList.includes(comment.id))
    }

    render() {
        const { post, currentUser } = this.props 
        const comments = this.getComments(post.comment_ids)
        return ( <>
        {this.state.deleteUserPopup && 
        
        <Popup title={"Deleting User"} 
               text={"Are you sure you want to delete the account of " + (post?.user.username || "unknown") + "?"} 
               handleClose={this.handleDeleteUserPopup}
        /> 
        }

        {this.state.deletePostPopup && 
        
        <Popup title={"Deleting Post"} 
               text={"Are you sure you want to delete this post \"" + (post?.title || "unknown post title") +"\"?"} 
               handleClose={this.handleDeletePostPopup}
        /> 
        }

        <div className='post'>
            {currentUser?.admin &&
                <div className="action-button delete-post" onClick={this.toggleDeletePostPopup}>
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
                        <div className="action-button" onClick={this.toggleDeleteUserPopup}>
                            <img src={deleteIcon} alt="" className='icon'/>
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
        </>
        )
    }

}

export default Post