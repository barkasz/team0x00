import './content.css'
import { Route, Link } from 'react-router-dom'
import searchIcon from '../../assets/search.svg'
import menuIcon from '../../assets/menu.svg'
import Upload from '../Upload/Upload'
import _posts from '../../data/posts'
import Users from '../Users/Users'
import AddUser from '../AddUser/AddUser'
import ChangePassword from '../ChangePassword/ChangePassword'
import Explore from '../Explore/Explore'

function Content({ currentUser, ...props }){
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

                        <Route exact path = "/" render={() => (<>
                                <h1 className='mb-4'>Explore</h1>
                                <Explore/>
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

                        <Route exact path = "/add-user" render={() => (
                            <>
                                <h1 className='mb-4'>Create User</h1>
                                <AddUser/>
                            </>
                        )}/>

                        <Route exact path = "/change-password/:id" render={() => (
                            <>
                                <h1 className='mb-4'>Change Password</h1>
                                <ChangePassword/>
                            </>
                        )}/>
                    </div>
                </div>
        )
}

export default Content