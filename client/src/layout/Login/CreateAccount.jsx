import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
export default function CreateAccount(){
    const [data,setData] = React.useState({})
    const [err,setErr] = React.useState(false)
    const handleChange = ev =>{
        setData({...data,[ev.target.name] : ev.target.value})
    }
    const submit = async (ev) =>{
        ev.preventDefault();
        try {
            let res = await Axios.post('/user/create',data);
            if(res.data){                
                setData({login : true})
            }
        } catch {
            setErr('Something went wrong')
        }           
    }
    return(
        <React.Fragment>
            {
                data.login && <Redirect to='/login'/>
            }
            <form onSubmit={submit}>
            <div className="form-group">
                    <label>Your Name</label>
                    <input type='text' name='name' className="form-control"  placeholder="Your Name" onChange={handleChange} required/>                    
                </div>
                <div className="form-group">
                    <label>ID</label>
                    <input type='number' name='id' className="form-control"  placeholder="ID" onChange={handleChange} required/>      
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  placeholder="Password" name='password' onChange={handleChange} required/>
                </div>
                {
                    err && <div className='alert alert-danger'>
                                    <p>{err}</p>
                            </div>
                }                
                <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
        </React.Fragment>
    )
}