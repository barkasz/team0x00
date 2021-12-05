import React, {useState, useEffect, useCallback} from 'react'
import './post.css'
import Comment from '../Comment/Comment'
import commentIcon from '../../assets/comment.svg'
import deleteIcon from '../../assets/trash.svg'
import downloadIcon from '../../assets/download.svg'
import Popup from '../Popup/Popup'
import { API } from '../../services/api-service'
import randomProfilePic from '../../services/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'
import useToken from '../../hooks/useToken'
import placeholderImage from '../../assets/placeholder.png'
import { useHistory } from "react-router-dom";

function Post ({post }) {
    const [deletePopup, setDeletePopup] = useState(false)
    const [comments, setComments] = useState(post.comments)
    const [gif, setGif] = useState()
    const [caff, setCaff] = useState()
    const [profilePic] = useState(randomProfilePic())
    const [newComment, setNewComment] = useState('')
    const { token } = useToken()
    const history = useHistory();
    
    const getGif = useCallback( async (signal) => {
        const res = await API.downloadGif(post.caff_id, signal)
        setGif(res) 
    }, [post.caff_id])

    const getCaff = useCallback( async (signal) => {
        const res = await API.downloadCaff(post.caff_id, signal)
        setCaff(res) 
    }, [post.caff_id] )

    useEffect(() => {
        const controller = new AbortController();
        try {
            const signal = controller.signal;
            getGif(signal)
            getCaff(signal)
        } catch (e) {
            console.log(e.message)
        }
        return () => {
            controller.abort();
        }
    }, [getGif, getCaff])

    const handleDeletePopup = async (resp) => {
        if(resp) {
            try {
                await API.deletePost(post).then(() => {
                    history.push('/login')
                })
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
                <a href={caff + ''} download={ post?.title + '.caff'}>
                <div className="action-button">
                    
                   <img src={downloadIcon} className='icon' alt="Download icon" />
                </div>
                </a>
            
            {token?.admin &&
                <div className="action-button" onClick={() => toggleDeletePopup() }>
                     <img src={deleteIcon} className='icon' alt="Delete icon" />
                </div>
            }

            </div>

            <img src={gif || placeholderImage} className="post-img" alt={post?.title || 'Posted pic'}/>
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
                            comments.map(comment => (<Comment key={comment._id} comment={comment}/>))
                        }
                    </div>
                    
                    <div className="write w-100">
                        <div className="input-with-icon w-100">
                            <img src={commentIcon} alt="Comment icon" className="icon"/>
                            <input type="text" className='w-100' onKeyDown={e => e.key === 'Enter' && handlePostComment()} placeholder="Write a comment here..." value={newComment} onChange={ (event) => setNewComment(event.target.value)} />
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