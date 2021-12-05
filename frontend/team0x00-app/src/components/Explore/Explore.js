import React, { useState, useEffect } from 'react';
import { API } from "../../services/api-service";
import Post from '../Post/Post'

function Explore(){
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState(false) 

    const fetchPosts = async (signal) => {
        const res = await API.getPosts(signal)
        setPosts(res)
        if (res instanceof Array) {
            setFetchError(false)
        } else {
            setFetchError(true)
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            fetchPosts(signal)
        } catch (e) {
            setFetchError(true)
        }
        return () => controller.abort()
    }, [])
    
    return ( <>
            { fetchError &&  <p>There are no posts to show at the moment.</p> }
                            
            { !fetchError && posts.map !== undefined &&posts?.map(post => (
                <Post key={post._id} post={post} triggerRefresh={()=>{}}/>
             ))
            }
            </>
    )
}

export default Explore
