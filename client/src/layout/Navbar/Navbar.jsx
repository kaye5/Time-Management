import React from 'react'
import Auth from '../../modules/Auth'
import Axios from 'axios';
export default function Navbar(){
    const [isAuth,setAuth] = React.useState(false)
    function checkAuth(){
        if(Auth.isUserAuthenticated())
            setAuth(true);
        else 
            setAuth(false)
    }
    React.useEffect(()=>{
        checkAuth()
        // eslint-disable-next-line
    },[Axios.defaults.headers.common['Authorization']])
    const renderLogin = () => {
        if(!isAuth){
            return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/create">Create Account</a>
                </li>
            </ul>   )
        } else {
            return (
            <ul className="navbar-nav">                
                <li className="nav-item">
                    <a className="nav-link" href="/collection">Collection</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href='/logout'>Logout</a>
                </li>
            </ul> )
        }
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <a className="navbar-brand" href="/collection">Time Management</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            {renderLogin()}
        </div>
        </nav>
    )
}

