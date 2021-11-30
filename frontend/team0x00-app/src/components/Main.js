import React, {Component } from 'react'
import Sidebar from  './Sidebar/Sidebar'
import Content from './Content/Content'
import users from '../data/users'


class Main extends Component {
    constructor() {
        super()
        this.openMenu = this.openMenu.bind(this)
        this.state = {
            menuOpen: false
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


export default Main