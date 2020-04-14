import React from 'react'
import Axios from 'axios'
import Participant from './Participant'
import { Redirect } from 'react-router-dom'

export default function EditCollection(props){
    const [data,setData] = React.useState(props.location.state)
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
            let res = await Axios.put('/collection/update',{
                collectionID : data._id,
                data : {name : data.name,pin : data.pin}
            })
            if(res.data)
                setData({done : true})
        } catch(err){
            console.log(err)
            setData({...data , err : true})
        }
        props.history.goBack()
    }
    if(props.location.state)
    return (
        <React.Fragment>
        <button className='btn btn-info mb-5' onClick={()=>props.history.goBack()}>Go Back</button>
        <form onSubmit={submit}>
            <h3>Edit Collection</h3>
            <label>Name</label>
            <input name='name' type='text' onChange={handleChange} className='form-control' required value={data.name}/>
            <label>Pin</label>
            <input name='pin' type='text' onChange={handleChange} className='form-control' maxLength='4' minLength='4' required value={data.pin}/>

            <button className='btn btn-primary mt-3'>save</button>
        </form>
        <div className='mt-4'>
            <h3>Participant</h3>
            <Participant collID={data._id}/>
        </div>
        </React.Fragment>
    )
    else if(props.history.length <=5)
    return (<Redirect to='/collection'/>)
    else return(
        <div className='spinner-grow'></div>
    )
}