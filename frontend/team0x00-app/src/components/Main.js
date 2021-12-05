import React, { useState } from 'react'
import Sidebar from  './Sidebar/Sidebar'
import Content from './Content/Content'
import useToken from '../hooks/useToken';


function Main() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { token } = useToken()
    const user = token
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    return (
         <div className="container">
                <Sidebar isOpen={menuOpen} toggleMenu={toggleMenu} currentUser={user}/>
                <Content toggleMenu = {toggleMenu} currentUser={user}/>
        </div>
    )
}

export default Main