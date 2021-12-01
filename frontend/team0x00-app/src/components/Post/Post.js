import React, {useState} from 'react'
import './post.css'
import Comment from '../Comment/Comment'
import pic from '../../assets/tea.webp'
import commentIcon from '../../assets/comment.svg'
import deleteIcon from '../../assets/trash.svg'
import downloadIcon from '../../assets/download.svg'
import Popup from '../Popup/Popup'
import _comments from '../../data/comments'
import { API } from '../../api-service'
import randomProfilePic from '../../data/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'
import useToken from '../../hooks/useToken'

function Post ({post, triggerRefresh }) {
    const [deletePopup, setDeletePopup] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const [profilePic] = useState(randomProfilePic())
    const [newComment, setNewComment] = useState()
    const { token } = useToken()

    const handleDeletePopup = (resp) => {
        if(resp) {
            try {
                API.deletePost(post)
                triggerRefresh([])
            } catch (e) {
                alert(e.message)
            }
        }
        toggleDeletePopup()
    }

    const toggleDeletePopup = () => {
       setDeletePopup(!deletePopup)
    }

    const handlePostComment = async () => {
        const postComment_res = await API.postComment(post["_id"], {"content" : newComment})
        if (postComment_res.hasOwnProperty('content')) { 
            setNewComment('')
            const getComment_res = await API.getPostById(post["_id"])
            setComments(getComment_res.comments)
        }
        else {
            console.log("ERROR: " + postComment_res)
        }
    }

    
        return ( <>
        {deletePopup && 
        
        <Popup title={"Deleting Post"} 
               text={"Are you sure you want to delete this post \"" + (post?.title || "unknown post title") +"\"?"} 
               handleClose={handleDeletePopup}
        /> 
        }

        <div className='post'>
            <div className="post-actions">

                <div className="action-button" onClick={() => {}}>
                    <img src={downloadIcon} className='icon' alt="Download icon" />
                </div>
            
            {token?.admin &&
                <div className="action-button" onClick={() => toggleDeletePopup() }>
                    <img src={deleteIcon} className='icon' alt="Delete icon" />
                </div>
            }

            </div>

            <img src={post?.image || pic} className="post-img" alt={post?.title || 'Posted pic'}/>
            <div className="post-info">
                
                <h2>{post?.title || 'No title'}</h2>
                <div className="author-bar mb-3">
                    <div className="profile profile-medium">
                        <img src={profilePic} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}} alt="Poster's profile pic"/> 
                    </div>
                    <div className="info">
                        <p>{post?.author || 'Unknown'}</p>
                    </div>
                </div>
                <div className="comment-section">
                    <div className="comments">
                        {
                            comments.map(comment => (<Comment key={comment.id} comment={comment}/>))
                        }
                    </div>
                    
                    <div className="write w-100">
                        <div className="input-with-icon w-100">
                            <img src={commentIcon} alt="Comment icon" className="icon"/>
                            <input type="text" className='w-100' placeholder="Write a comment here..." value={newComment} onChange={ (event) => setNewComment(event.target.value)} />
                        </div>
                        <button className='btn btn-small' onClick={handlePostComment}>Send</button>
                    </div>
                </div>
            </div>
        </div>
        </>
        )

}

export default Post