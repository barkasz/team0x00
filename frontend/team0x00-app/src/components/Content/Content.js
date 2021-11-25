import React, {Component} from 'react'
import './content.css'
import { Route, Link } from 'react-router-dom'
import searchIcon from '../../assets/search.svg'
import menuIcon from '../../assets/menu.svg'
import Post from '../Post/Post'
import Upload from '../Upload/Upload'

import _posts from '../../data/posts'

class Content extends Component {
    render(){
        const {currentUser, ...props} = this.props
        const posts = _posts
        
        return (
                <div className="content">
                    <div className="wrapper">

                            <div className="header">
                                <img className='menuBtn' src={menuIcon} alt="" onClick={() => props.toggleMenu()}/>
                                <div className="input-with-icon">
                                    <img src={searchIcon} alt="Search icon" className="icon search-icon"/>
                                    <input type="text" placeholder="Search..."/>
                                </div>
                                <Link to='/upload' className='btn btn-primary mb-0'>Upload</Link>
                            </div>

                        <Route exact path = "/" render={() => (
                            <>
                                <h1 className='mb-4'>Explore</h1>
                                { posts.map(post => (
                                    <Post key={post.id} post={post} currentUser={currentUser}/>
                                ))
                                }
                                
                            </>
                        )}/>

                        <Route exact path = "/upload" render={() => (
                            <>
                                <h1 className='mb-4'>Upload</h1>
                                <Upload/>
                            </>
                        )}/>

                    </div>
                </div>
        )
    }
}

export default Content