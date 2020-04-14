import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../modules/Auth'
export default function Logout(){
    return (
        <React.Fragment>
            {
                Auth.deauthenticateUser()
            }
            <Redirect to='/' />
        </React.Fragment>
    )
}