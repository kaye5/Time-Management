import React from 'react'
import Axios from 'axios'
export default function Participant(props){
    const [data,setData] = React.useState([])
    const [isAdd,setAdd] = React.useState(false)
    const [change,setChange] = React.useState(false)
    const [err,seterr] = React.useState(false)
    const toogle = () =>{
        setAdd(!isAdd)
    }

    async function getParti(){
        try{
            let res = await Axios.get(`/collection/participant/view?collection=${props.collID}`)
            if(res.data)
                setData(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const handlechange = (ev) => {
        setAdd({...isAdd,userID : ev.target.value})
    }
    const addUser = async () => {
        try {
            await Axios.put('/collection/participant/add',{
                user : isAdd.userID,
                collectionID : props.collID
            })
        }catch(err){
            console.log(err)
            seterr('User not found')
        }
        setAdd(false)
        setChange(!change)
    }

    function renderAdd(){
        return (
            <div className='my-3 row'>
                <div className='col-3'>
                    <label>User ID </label>
                    <input type='text' name ='user' onChange={handlechange} className='form-control'/>
                </div>
                <div className='col-6'>
                    <button className='btn btn-primary' onClick={addUser}>Add User</button>
                </div>
            </div>
        )
    }

    const deleteUser = async (id) =>{
        try {
            await Axios.put('/collection/participant/update',{participantID : id})
            setChange(!change)
        } catch(err){
            console.log(err)
        }
    }
    
    React.useEffect(()=>{
        getParti()
        // eslint-disable-next-line
    },[change])
    return (
        <React.Fragment>
            <div className='my-3'>
                <button className='btn btn-primary' onClick={toogle}>Add participant</button>
            </div>
            {isAdd && renderAdd()}
            {
                err && 
                <div className='my-2 alert alert-danger'>
                    <p>{err}</p>
                </div>
            }
            
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Partiicpant ID</th>
                        <th>Participant Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(parti=>(
                            <tr key={parti._id}>
                                <td>{parti.user.id}</td>
                                <td>{parti.user.name}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={()=>deleteUser(parti._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </React.Fragment>
    )
}