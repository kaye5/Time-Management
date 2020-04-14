import React from 'react'
import Axios from 'axios'
export default function CreateCollection(props){
    const [data,setData] = React.useState({})
    const handleChange = (ev) =>{
        setData({
            ...data,
            [ev.target.name] : ev.target.value
        })
    }
    const submit = async (ev) =>{
        ev.preventDefault()
        setData({...data,id : Math.floor(Math.random() * 10)})
        try{
            let res = await Axios.post('/collection/create',data)
            if(res.data)
                setData({done : true})
        } catch(err){
            console.log(err)
            setData({...data , err : true})
        }
        props.close()
    }
    return (
        <form onSubmit={submit}>
            <h3>New Collection</h3>
            <label>Name</label>
            <input name='name' type='text' onChange={handleChange} className='form-control' required/>
            <label>Pin</label>
            <input name='pin' type='text' onChange={handleChange} className='form-control' maxLength='4' minLength='4' required/>

            <button className='btn btn-primary mt-3'>Create</button>
        </form>
    )
}