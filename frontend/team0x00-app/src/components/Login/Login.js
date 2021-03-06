import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './login.css'
import logo from '../../assets/logo.png'
import { API } from "../../services/api-service";
import useToken from "../../hooks/useToken";


export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [regUsername, setRegUsername] = useState();
    const [regPassword, setRegPassword] = useState();

    const [loginWarning, setLoginWarning] = useState('');
    const [regWarning, setRegWarning] = useState('');
    const [regSuccess, setRegSuccess] = useState('');

    const history = useHistory();
    const { token, setToken } = useToken()

    useEffect(()=>{
        if (token) {
            history.push('/')
        }
    }, [token, history])

    const loginSubmit = async e => {
        e.preventDefault();

        try{
            const response = await API.login({"username": username, "password": password});
        
            if(!response) {
                setLoginWarning("The servers are unavailable!")
            } else if (response.username) {
                setToken({token: response});
                history.push("/");
            } else {
                setLoginWarning(response.message);
            }
        } catch (e) {
            setLoginWarning()
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
            <img src={logo} alt="CAFFgram Logo" className="logo mb-2" style={{ marginTop: '60px'}}/>
        </div>
        <div className="loginbox">
            <h2 className="title" style={{display:'flex', justifyContent:'center'}}>Sign in</h2>
            <form onSubmit={loginSubmit} style={{width: '100%'}}>
                    { loginWarning && <div className="warning">
                        <p>{loginWarning}</p>
                    </div> }
            <div className="loginbox-form-elements">
                    <input required type="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />

                    <input required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <button type='submit' className='btn btn-primary mt-1 w-100'>Sign in</button>
                    </div>
            </form>
            <form onSubmit={registerSubmit} style={{width: '100%'}}>
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

                    <input type="text" required minLength="3" name="regUsername" placeholder="Username" onChange={e => setRegUsername(e.target.value)} />
                    <input type="password" required minLength="8" pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$' name="regPassword" placeholder="Password" onChange={e => setRegPassword(e.target.value)} />
                    <small className='password-disclaimer'>At least 8 characters, containing uppercase and lowercase letters, numbers/special characters</small>
                    <button type='submit' className='btn btn-outline mt-1 w-100'>Register</button>
            </div>
            </form>
            
        </div>
        </>
    );
}