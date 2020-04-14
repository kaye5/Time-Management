import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
export default function CreateSchedule(props){
    const [data,setData] = React.useState({})
    const handleChange = (ev) =>{
        setData({...data, [ev.target.name] : ev.target.value});
    }

    function renderInput(type,name){
        return (
            <div className='my-3'>
                <label className='font-weight-bold'>{name.toUpperCase()}</label>
                <input type={type} name={name} onChange={handleChange}
                    id={name}
                    className='form-control'
                    required 
                />
            </div>
        )
    }
    const handleSubmit = async (ev) =>{
        ev.preventDefault();
        if(!data.startDate && !data.deadline){
            setData({...data , err : 'Please fill all the input.'})
            return -1 
        }            
        try {
            await axios.post('/schedule/create',{
                collectionID : props.location.state.collID,
                data
            })
            setData({...data,redir : true })
        } catch(err){
            console.log(err)
            setData({...data , err : 'Something went wrong.'})
        }
    }
    return (
        <React.Fragment>
            {
                data.redir && <Redirect to={`/collection/${props.location.state.collID}`} />
            }
            <button className='btn btn-info mb-4' onClick={()=>props.history.goBack()}>Go back</button>
            <h3>Create New Schedule</h3>
            <form>
                {renderInput('text','title')}
                {renderInput('text','subtitle')}
                {renderInput('datetime-local','startDate')}
                {renderInput('datetime-local','deadline')}

                <label className='font-weight-bold'>Description</label>
                <textarea name='description' onChange={handleChange} rows='5' maxLength='200' className='form-control my-3'
                    style={{maxHeight:'149px',minHeight:'50px'}}
                />
                {
                    data.err && 
                    <div className='alert alert-danger my-3'>
                        {data.err}
                    </div>
                }
                
                <button className='btn btn-primary mt-3' onClick={handleSubmit}>Create</button>

            </form>
        </React.Fragment>
    )
}