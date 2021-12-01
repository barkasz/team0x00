import React, {Component} from 'react'
import './post.css'
import Comment from '../Comment/Comment'
import pic from '../../assets/tea.webp'
import commentIcon from '../../assets/comment.svg'
import editIcon from '../../assets/edit.svg'
import deleteIcon from '../../assets/trash.svg'
import downloadIcon from '../../assets/download.svg'
import Popup from '../Popup/Popup'
import _comments from '../../data/comments'
import { Link } from 'react-router-dom'
import { API } from '../../api-service'
import randomProfilePic from '../../data/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'

class Post extends Component {
    constructor(props){
        super(props)

        this.state = {
            deletePostPopup: false,
            post: props.post,
            profilePic: randomProfilePic(),
            comment: '',
            comment_list : [],
            _comments : []
        }
    }

    handleDeletePostPopup = (resp) => {
        if(resp) {
            API.deletePost(this.state.post)
        }
        this.toggleDeletePostPopup()
    }

    toggleDeletePostPopup = () => {
        this.setState({
            deletePostPopup: !this.state.deletePostPopup
        })
    }

    getComments = (idList)  => {
        return _comments.filter(comment => idList.includes(comment.id))
    }

    requestData = async () => {
        await API.getComments().then(data => {
            // console.log(data);
            const data2 = data.filter(comment => this.props.post.comment_ids.includes(comment.id))
            // console.log(data2);
            this.setState({comment_list : data2})
        })
        .catch(error => {
            console.error('There was an error in requestData!', error);
        });        
    }

    componentDidMount(){
        this.requestData()

    }



    render() {
        const { post, currentUser } = this.props 
        
        return ( <>
        {this.state.deletePostPopup && 
        
        <Popup title={"Deleting Post"} 
               text={"Are you sure you want to delete this post \"" + (post?.title || "unknown post title") +"\"?"} 
               handleClose={this.handleDeletePostPopup}
        /> 
        }

        <div className='post'>
            <div className="post-actions">

                <div className="action-button" onClick={() => {}}>
                    <img src={downloadIcon} className='icon' alt="Download icon" />
                </div>
            
            {!currentUser?.admin &&
                <div className="action-button" onClick={() => this.toggleDeletePostPopup() }>
                    <img src={deleteIcon} className='icon' alt="Delete icon" />
                </div>
            }

            </div>

            <img src={post?.image || pic} className="post-img" alt={post?.title || 'Posted pic'}/>
            <div className="post-info">
                
                <h2>{post?.title || 'No title'}</h2>
                <div className="author-bar mb-3">
                    <div className="profile profile-medium">
                        <img src={this.state.profilePic} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}} alt="Poster's profile pic"/> 
                    </div>
                    <div className="info">
                        <p>{post?.user?.username || 'Unknown'}</p>
                    </div>
                </div>
                <div className="comment-section">
                    <div className="comments">
                        {
                            this.state.comment_list?.map(comment => (<Comment key={comment.id} comment={comment}/>))
                        }
                    </div>
                    
                    <div className="write w-100">
                        <div className="input-with-icon w-100">
                            <img src={commentIcon} alt="Comment icon" className="icon"/>
                            <input type="text" className='w-100' placeholder="Write a comment here..." value={this.state.comment} onChange={ (event) => this.setState({comment: event.target.value})} />
                        </div>
                        <button className='btn btn-small' onClick={() => alert(this.state.comment)}>Send</button>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }

}

export default Post