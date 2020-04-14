import React from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
export default function JoinCollection(props){
    const [data,setData] = React.useState({})
    const handleChange = (ev) =>{
        setData({
            ...data,
            [ev.target.name] : ev.target.value
        })
    }
    const submit = async (ev) =>{
        ev.preventDefault()
        try {
            let res = await Axios.put('/collection/participant/join',{
                collectionID : props.match.params.id,
                pin : data.pin
            })
            if(res.data)
                setData({login : true})
        }catch(err){
            console.log(err)
            setData({...data,err : 'Something went wrong'})
        }
    }
    return (
        <React.Fragment>
            {data.login && <Redirect to='/collection' />}
            <form onSubmit={submit}>
                <h1 className='mb-3'>Join Collection</h1>
                <label>Pin : </label>
                <input name='pin' type='text' maxLength='4' minLength='4' className='form-control' onChange={handleChange} required/>
                {
                    data.err && 
                    <div className='alert alert-danger my-3'>
                        <p>{data.err}</p>
                    </div>
                }
                <button className='btn btn-primary mt-3'>Join</button>
            </form>
        </React.Fragment>
    )
}