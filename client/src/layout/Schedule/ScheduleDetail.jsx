import React from 'react'
import axios from 'axios'
import moment from 'moment-timezone'
export default function ScheduleDetail(props){
    const [data,setData] = React.useState(props.location.state)
    const [edit,setEdit] = React.useState(false)

    const handleChange = (ev) =>{
        setData({...data, [ev.target.name] : ev.target.value});
    }

    function renderInput(type,name,value){
        return (
            <div className='my-3'>
                <label className='font-weight-bold'>{name.toUpperCase()}</label>
                <input type={type} name={name} value={value} onChange={handleChange}
                    className='form-control'
                    disabled=
                    {
                        edit ? false : true
                    }
                    required 
                />
            </div>
        )
    }
    const handleSubmit = async (ev) =>{
        ev.preventDefault();
        try {
            if(data.status === 'completed ')
                setData({...data , status : ''})
            await axios.put('/schedule/update',{
                id : data._id,
                data : data
            })
        } catch(err){
            console.log(err)
            setData({...data , err : 'Something went wrong.'})
        }
        setEdit(false)
    }

    const toogleEdit = (ev) =>{
        ev.preventDefault()
        setEdit(!edit)
    }

    const delSch = async () =>{
        try {
            await axios.put('/schedule/delete',{id : data._id});
            props.history.goBack();
        } catch(err){
            console.log(err)
            setData({...data , err : 'Something went wrong.'})
        }
    }

    if(data)
    return (
        <React.Fragment>
            <button className='btn btn-info mb-4' onClick={()=>props.history.goBack()}>Go back</button>
            <h3>{data.title}</h3>
            <h4>{data.subtitle}</h4>
            <form>
                {renderInput('text','title',data.title)}
                {renderInput('text','subtitle',data.subtitle)}
                {renderInput('datetime-local','startDate',moment(data.startDate).format('YYYY-MM-DDThh:mm'))}
                {renderInput('datetime-local','deadline',moment(data.deadline).format('YYYY-MM-DDThh:mm'))}
                <textarea name='description' onChange={handleChange} rows='5' maxLength='200' className='form-control my-3' value={data.description}
                    style={{maxHeight:'149px',minHeight:'50px'}}
                    disabled=
                    {
                        edit ? false : true
                    }
                />

                <div className='my-2'>
                {
                    edit ? 
                    <button className='btn btn-primary' onClick={handleSubmit}>Save Change</button>
                    :
                    <button className='btn btn-primary' onClick={toogleEdit}>Edit</button>
                }
                </div>
            </form>
            <button className='btn btn-danger' onClick={delSch}>Delete Schedule</button>

            {
                    data.err && 
                    <div className='alert alert-danger my-3'>
                        {data.err}
                    </div>
                }
        </React.Fragment>
    )
    else 
        return (
            <div className='spinner-grow'></div>
        )
}