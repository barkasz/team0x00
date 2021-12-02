import React, { useState, useEffect } from 'react';
import { API } from "../../api-service";
import Post from '../Post/Post'

function Explore(){
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState(false) 

    useEffect(() => {
        async function fetchPosts(){
            const res = await API.getPosts()
            setPosts(res)
            if (res instanceof Array) {
                setFetchError(false)
            } else {
                setFetchError(true)
            }
            console.log(res)
        }
        try {
            fetchPosts()
        } catch (e) {
            setFetchError(true)
        }
        
    }, [])
    
    return ( <>
                            { fetchError && 

                                <p>There are no posts to show currently.</p>


                            }
                            
                            { !fetchError && posts.map !== undefined &&posts?.map(post => (
                                <Post key={post._id} post={post} triggerRefresh={()=>{}}/>
                            ))
                            }
                </>
    )
}

export default Explore
