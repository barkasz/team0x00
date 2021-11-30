import React, { useState } from "react";
import './login.css'
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types';
import { API } from "../../api-service";


export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [warningText, setWarningText] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await API.login({"username": username, "password": password});
        
        if(!response) {
            setWarningText("The servers are unavailable!")
        } else if (response.username) {
            setToken({token: response});
        } else {
            setWarningText(response.message);
        }
        
    }

    return (

        <form onSubmit={handleSubmit}>
        <div className="topbox">
            <img src={logo} alt="CAFFgram Logo" className="logo mb-2" />
        </div>
        <div className="loginbox">
            <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Sign in</h2>
        { warningText && <div className="warning">
                        <p>{warningText}</p>
                    </div> }
            <div className="loginbox-form-elements">
                    


                    <input type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />

                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='btn btn-primary mt-1 w-100'>Sign in</button>

                    <hr style={{width:'100%', marginTop: 20, marginBottom: 20}}/>

                    <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Register</h2>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type='submit' className='btn btn-outline mt-1 w-100'>Register</button>
            </div>
            
        </div>
        </form>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

  

// class Login extends Component {
    
//     render() {
//         return (
            
//             <form action="">
//             <div className="topbox">
//                 <img src={logo} alt="CAFFgram Logo" className="logo mb-2" />
//             </div>
//             <div className="loginbox">
//                 <div className="loginbox-form-elements">
//                         <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Sign in</h2>
//                         <input type="email" placeholder="E-mail" />
//                         <input type="password" placeholder="Password" />
//                         <button type='submit' className='btn btn-primary mt-1 w-100'>Sign in</button>

//                         <hr style={{width:'100%', marginTop: 20, marginBottom: 20}}/>

//                         <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Register</h2>
//                         <input type="text" placeholder="Username" />
//                         <input type="email" placeholder="E-mail" />
//                         <input type="password" placeholder="Password" />
//                         <button type='submit' className='btn btn-outline mt-1 w-100'>Register</button>
//                 </div>
                
//             </div>
//             </form>
//         )
//     }
// }

