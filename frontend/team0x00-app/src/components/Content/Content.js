import React, { useState } from 'react'
import './content.css'
import { Route, Link, useHistory } from 'react-router-dom'
import searchIcon from '../../assets/search.svg'
import menuIcon from '../../assets/menu.svg'
import Upload from '../Upload/Upload'
import Users from '../Users/Users'
import Explore from '../Explore/Explore'
import Search from '../Search/Search'


function Content({ currentUser, ...props }){
        const [search, setSearch] = useState()
        const history = useHistory();
        const triggerSearch = (e) => {
            setSearch(e.target.value)
            history.push('/post/search/?title='+e.target.value)
        }
        return (
                <div className="content">
                    <div className="wrapper">
                            <div className="header">
                                <img className='menuBtn' src={menuIcon} alt="" onClick={() => props.toggleMenu()}/>
                                <div className="input-with-icon">
                                    <img src={searchIcon} alt="Search icon" className="icon search-icon"/>
                                    <input type="text" onKeyDown={e => e.key === 'Enter' && triggerSearch(e)} placeholder="Search..."/>
                                </div>
                                <Link to='/upload' className='btn btn-primary mb-0'>Upload</Link>
                            </div>

                        <Route exact path = "/" render={() => (<>
                                <h1 className='mb-4'>Explore</h1>
                                <Explore/>
                            </>
                        )}/>

                        <Route path = "/post/search/" render={() => (<>
                                <h1 className='mb-4'>Search</h1>
                                <Search title={search}/>
                            </>
                        )}/>

                        <Route exact path = "/upload" render={() => (
                            <>
                                <h1 className='mb-4'>Upload</h1>
                                <Upload triggerRefresh={()=>{}}/>
                            </>
                        )}/>

                        <Route exact path = "/users" render={() => (
                            <>
                                <h1 className='mb-4'>Users</h1>
                                <Users/>
                            </>
                        )}/>
                    </div>
                </div>
        )
}

export default Content