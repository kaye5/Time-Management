import React from 'react';
import Axios from 'axios';
import Auth from '../../modules/Auth';
import { Redirect } from 'react-router-dom';
export default function Login(){
    const [data,setData] = React.useState({})
    const [err,setErr] = React.useState(false)
    const handleChange = ev =>{
        setData({...data,[ev.target.name] : ev.target.value})
    }
    const submit = async (ev) =>{
        ev.preventDefault();
        try {
            let res = await Axios.post('/user/login',data);
            if(res.data){
                localStorage.setItem('user',res.data);
                if(Auth.isUserAuthenticated()){
                    setData({login : true});
                }
            }
        } catch {
            setErr('Wrong Password')
        }           
    }
    return(
        <React.Fragment>
            {
                data.login && <Redirect to='/collection'/>
            }
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>ID/Username</label>
                    <input type='number' name='nim' className="form-control"  placeholder="ID / Username" onChange={handleChange}/>
                    
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  placeholder="Password" name='password' onChange={handleChange}/>
                </div>
                {
                    err && <div className='alert alert-danger'>
                                    <p>{err}</p>
                            </div>
                }                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </React.Fragment>
    )
}