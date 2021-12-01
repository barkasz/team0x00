import React, { useState } from 'react'
import './sidebar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import closeIcon from '../../assets/close.svg'
import randomProfilePic from '../../data/profile_pic'
import defaultProfilePic from '../../assets/default-user.png'
import useToken from '../../hooks/useToken'
import { API } from '../../api-service'

function Sidebar(props) {
        const { isOpen, currentUser, toggleMenu } = props
        const { token } = useToken()
        const [profilePic, setProfilePic] = useState(randomProfilePic())

        const handleLogout = () => {
            sessionStorage.removeItem('token');
            API.logout();
        }
        
        return  ( <div className={`sidebar bg-accent ${isOpen ? "open" : ""}`}> 
                    <div className="fix">
                    <div className="action-button close"  onClick={() => toggleMenu()} >
                        <img src={closeIcon} className='icon' alt="Close Button" />
                    </div>
                    <Link to='/'><img src={logo} alt="CAFFgram Logo" className="logo mb-2" /></Link>
                    

                    <div className="user-info mt-2">
                        <div className="profile profile-large">
                            <img src={profilePic} onError={(e)=>{e.target.onerror = null; e.target.src=defaultProfilePic}} alt="Profile pic" />
                        </div>
                        { currentUser?.admin && <small>Administrator</small> }
                        <h1 className='mb-0'>{currentUser?.username || 'Unknown' }</h1>
                    </div>

                    <div className="menu">
                        <ul>
                            <li className='menu-element'>
                            <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.9167 0.583344C5.78667 0.583344 0 6.37001 0 13.5C0 20.63 5.78667 26.4167 12.9167 26.4167C20.0467 26.4167 25.8333 20.63 25.8333 13.5C25.8333 6.37001 20.0467 0.583344 12.9167 0.583344ZM12.9167 23.8333C7.22042 23.8333 2.58333 19.1963 2.58333 13.5C2.58333 7.80376 7.22042 3.16668 12.9167 3.16668C18.6129 3.16668 23.25 7.80376 23.25 13.5C23.25 19.1963 18.6129 23.8333 12.9167 23.8333ZM5.8125 20.6042L15.5129 16.0963L20.0208 6.39584L10.3204 10.9038L5.8125 20.6042ZM12.9167 12.0792C13.7046 12.0792 14.3375 12.7121 14.3375 13.5C14.3375 14.2879 13.7046 14.9208 12.9167 14.9208C12.1288 14.9208 11.4958 14.2879 11.4958 13.5C11.4958 12.7121 12.1288 12.0792 12.9167 12.0792Z" fill="#333"/>
                                    </svg>
                                <Link to='' className=''>
                                    Explore
                                </Link>
                            </li>
                            { currentUser?.admin &&
                                <li className='menu-element'>
                                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.1665 5.33334C14.1665 2.755 12.0782 0.666672 9.49984 0.666672C6.9215 0.666672 4.83317 2.755 4.83317 5.33334C4.83317 7.91167 6.9215 10 9.49984 10C12.0782 10 14.1665 7.91167 14.1665 5.33334ZM11.8332 5.33334C11.8332 6.61667 10.7832 7.66667 9.49984 7.66667C8.2165 7.66667 7.1665 6.61667 7.1665 5.33334C7.1665 4.05 8.2165 3.00001 9.49984 3.00001C10.7832 3.00001 11.8332 4.05 11.8332 5.33334ZM0.166504 17V19.3333H18.8332V17C18.8332 13.8967 12.6148 12.3333 9.49984 12.3333C6.38484 12.3333 0.166504 13.8967 0.166504 17ZM2.49984 17C2.73317 16.1717 6.34984 14.6667 9.49984 14.6667C12.6382 14.6667 16.2432 16.16 16.4998 17H2.49984ZM22.3332 13.5V10H25.8332V7.66667H22.3332V4.16667H19.9998V7.66667H16.4998V10H19.9998V13.5H22.3332Z" fill="#333333"/>
                                </svg>
                                    <Link to='/users'>Users</Link>
                                </li>
                            }
                        </ul>
                    </div>

                    <div className="logout w-100 text-center">
                        <hr className='mb-2'/>
                        <div className="menu-element" onClick={() => localStorage.clear()}> 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 5L12.59 6.41L14.17 8H6V10H14.17L12.59 11.58L14 13L18 9L14 5ZM2 2H9V0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H9V16H2V2Z" fill="#333"/>
                            </svg>
                            <Link to='/login' onClick={handleLogout} className=''>Logout</Link>
                        </div>
                        
                    </div>
                </div>
                </div>
        )
    
}

export default Sidebar