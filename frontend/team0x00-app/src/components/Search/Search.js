import React, { useState, useEffect } from 'react';
import { API } from "../../api-service";
import Post from '../Post/Post'
import { useHistory } from 'react-router-dom'

function Search({title}){
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState(false)
    const history = useHistory();

    const getTitle = () => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        return params.get('title')
    }

    const fetchPosts = async () => {
        const res = await API.searchPosts(title)
            setPosts(res)
            if (res instanceof Array) {
                setFetchError(false)
            } else {
                setFetchError(true)
            }
            console.log(res)
    }

    useEffect(() => {
        if (title === '') {
            history.push('/')
        }
        try {
            fetchPosts()
        } catch (e) {
            setFetchError(true)
        }
        
    }, [title])
    
    return ( <>
                            { fetchError && 

                                <p>There are no results for your query.</p>


                            }
                            
                            { !fetchError && posts.map !== undefined &&posts?.map(post => (
                                <Post key={post._id} post={post} triggerRefresh={()=>{}}/>
                            ))
                            }
                </>
    )
}

export default Search
