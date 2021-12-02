import React, { useState } from 'react'
import Sidebar from  './Sidebar/Sidebar'
import Content from './Content/Content'
import users from '../data/users'
import useToken from '../hooks/useToken';


function Main() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { token, setToken } = useToken()
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

/*class Main extends Component {
    constructor() {
        super()
        this.openMenu = this.openMenu.bind(this)
        const { currentUser } = useToken() 
        this.state = {
            menuOpen: false,
            currentUser: currentUser
        }
    }

    openMenu(){
        this.setState({
            menuOpen: !this.state.menuOpen
          })
    }

    render() {
        return ( 
            <div className="container">
                <Sidebar isOpen={this.state.menuOpen} toggleMenu={this.openMenu} currentUser={users[0]}/>
                <Content toggleMenu = {this.openMenu} currentUser={users[0]}/>
            </div>
        )
    }

}
*/


export default Main