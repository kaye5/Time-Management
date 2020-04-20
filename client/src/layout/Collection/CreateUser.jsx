import React from 'react';
import Axios from 'axios';
export default function CreateUser(props){
    const [data,setData] = React.useState({
        role : 'admin'
    })
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
            setErr('Something went wrong, Check the ID must be taken')
        }           
    }
    return(
        <React.Fragment>
            {
                data.login && props.close()
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
                <div className="form-group">
                    <label>Role</label>
                    <select name='role' onChange={handleChange} required className='form-control'>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                    </select>
                </div>
                {
                    err && <div className='alert alert-danger'>
                        <p>{err}</p>
                    </div>
                }                
                <button type="submit" className="btn btn-primary">Create Account</button>                
            </form>
            <button className="btn btn-danger mt-1" onClick={()=>props.close()}>Cancle</button>
        </React.Fragment>
    )
}