import React, { useState, useEffect, useCallback } from 'react';
import { API } from "../../services/api-service";
import Post from '../Post/Post'
import { useHistory } from 'react-router-dom'

function Search({title}){
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState(false)
    const history = useHistory();

    const fetchPosts = useCallback( async () => {
        const res = await API.searchPosts(title)
            setPosts(res)
            if (res instanceof Array) {
                setFetchError(false)
            } else {
                setFetchError(true)
            }
    }, [title])

    useEffect(() => {
        if (title === '') {
            history.push('/')
        }
        try {
            fetchPosts()
        } catch (e) {
            setFetchError(true)
        }
        
    }, [title, fetchPosts, history])
    
    return ( <>
            { fetchError &&  <p>There are no results for your query.</p> }
                            
            { !fetchError && posts.map !== undefined &&posts?.map(post => (
                    <Post key={post._id} post={post} triggerRefresh={()=>{}}/>
                ))
            }
            </>
    )
}

export default Search
