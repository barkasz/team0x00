import React, { useState } from "react";
import './login.css'
import logo from '../../assets/logo.png'
import PropTypes from 'prop-types';
import { API } from "../../api-service";


export default function Login({ setToken }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [regUsername, setRegUsername] = useState();
    const [regPassword, setRegPassword] = useState();

    const [loginWarning, setLoginWarning] = useState('');
    const [regWarning, setRegWarning] = useState('');
    const [regSuccess, setRegSuccess] = useState('');

    const loginSubmit = async e => {
        e.preventDefault();
        const response = await API.login({"username": username, "password": password});
        
        if(!response) {
            setLoginWarning("The servers are unavailable!")
        } else if (response.username) {
            setToken({token: response});
        } else {
            setLoginWarning(response.message);
        }
    }

    const registerSubmit = async e => {
        e.preventDefault();
        const response = await API.registerUser({"username": regUsername, "password": regPassword});

        if (!response) {
            setRegWarning("The servers are unavailable!")
        } else if (response.status === 'SIGNED_UP_SUCCESFULLY') {
            setRegSuccess(response.message)
            setRegWarning('')
        } else {
            setRegWarning(response.message);
            setRegSuccess('')
        }
    }

    return (

       <>
        <div className="topbox">
            <img src={logo} alt="CAFFgram Logo" className="logo mb-2" />
        </div>
        <div className="loginbox">
            <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Sign in</h2>
            <form onSubmit={loginSubmit}>
                    { loginWarning && <div className="warning">
                        <p>{loginWarning}</p>
                    </div> }
            <div className="loginbox-form-elements">
                    <input type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />

                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='btn btn-primary mt-1 w-100'>Sign in</button>
                    </div>
            </form>
            <form onSubmit={registerSubmit}>
            <div className="loginbox-form-elements">   
                    <hr style={{width:'100%', marginTop: 20, marginBottom: 20}}/>

                    <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Register</h2>

                    { regWarning && 
                        <div className="warning">
                            <p>{regWarning}</p>
                        </div> 
                    }

                    { regSuccess && 
                        <div className="success">
                            <p>{regSuccess}</p>
                        </div> 
                    }


                    <input type="text" name="regUsername" placeholder="Username" onChange={e => setRegUsername(e.target.value)} />
                    <input type="password" name="regPassword" placeholder="Password" onChange={e => setRegPassword(e.target.value)} />
                    <button type='submit' className='btn btn-outline mt-1 w-100'>Register</button>
            </div>
            </form>
            
        </div>
        </>
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

