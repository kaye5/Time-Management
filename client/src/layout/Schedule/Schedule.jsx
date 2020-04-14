import React from 'react'
import Axios from 'axios'
import moment from 'moment-timezone'
import {Link} from 'react-router-dom'
import Auth from '../../modules/Auth'
export default function Schedule(props){
    const [data,setData] = React.useState([])
    const [log,setLog] = React.useState({})
    const [query,setQuery] = React.useState({
        showall : false,
        hide : 'completed',
        status : '',
        startDate : -1, 
        deadline : 1,
    })

    const filterDate = (ev) => {
        let condition = query[ev.target.id] === -1 ? 1 : -1;
        if(ev.target.id === 'deadline')
            setQuery({...query,startDate : null,deadline : condition})
        else 
            setQuery({...query,startDate : condition,deadline : null})
    }

    async function getdata(){ 
        setLog({load : true})
        if(await Auth.isParticipant(props.match.params.id)){
            setLog({load : false,auth:true})
        } else {
            setLog({load : false,auth:false})
            return -1
        }
        try {
            let res = await Axios.get(`/schedule/view/${props.match.params.id}`,{params : query})
            if(res.data)
                setData(res.data)
        } catch(err){
            console.log(err)
        }
    }

    function renderAction(status,id){
        if(status !== 'completed')
        return <button className='btn btn-success' onClick={()=>completeStatus(id)}>Mark as completed</button>
    }

    function renderTimer(status,start,end){
        if(status === 'completed')
            return   <span className='text-success'>{status.toUpperCase()} -</span>
        else if(status === 'overdue')
            return   <span className='text-danger'>{status.toUpperCase()} {moment(end).fromNow()}</span>
        else if(status === 'on going')
            return   <span className='text-warning'>{status.toUpperCase()} Due {moment().to(end)}</span>
        else return   <span className='text-info'>{status.toUpperCase()} Starting {moment().to(start)}</span>
    }
    
    const handleStatus = (ev) => {
        setQuery({...query,status : ev.target.id})
    }

    const completeStatus = async (id) => {
        try {
            await Axios.put('/schedule/update',{
                id,
                data : {
                    status : 'completed'
                }
            })
            setQuery({...query,load : true})
        } catch(err){
            console.log(err)
        }
    }

    const changeTab = () => {
        if(query.status)
            setQuery({...query,status : '',showall : false,hide : 'completed'})
        else 
            setQuery({...query,status : 'completed',showall : true,hide : ''})
    }
    
    React.useEffect(()=>{
        getdata();
        // eslint-disable-next-line
    },[query])

    if(log.load)
        return <div className='spinner-grow'></div>
    else if(log.auth)
    return (
        <React.Fragment>
            <h1>Schedule</h1>
            <div className='row my-4'>
                <div className='col-12 col-md-4 mb-3'>
                    <Link className='btn btn-primary' to={
                        {
                            pathname : '/schedule/create',
                            state : {
                                collID : props.match.params.id
                            }
                        }
                    }>+ New Schedule</Link>
                </div>
                {!query.showall && 
                <div className='col-12 col-md-4'>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter Status : {query.status}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <span className="dropdown-item" onClick={handleStatus}>Show all</span>
                            <span className="dropdown-item" id='waiting' onClick={handleStatus}>Waiting</span>
                            <span className="dropdown-item" id='on going' onClick={handleStatus}>On Going</span>
                            <span className="dropdown-item" id='overdue' onClick={handleStatus}>Overdue</span>
                        </div>
                    </div>
                </div>
                }
            </div>

            <div>
                Sort By : <button id='startDate' className='btn btn-primary btn-sm' onClick={filterDate}>Start Date</button>
                <button id='deadline' className='btn btn-primary btn-sm ml-1' onClick={filterDate}>Deadline</button>
            </div>

            <div className='my-3'>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <span className={query.showall ? 'nav-link' : 'nav-link active'} onClick={changeTab}>All Schedule</span>
                    </li>
                    <li className="nav-item">
                        <span className={query.showall ? 'nav-link active' : 'nav-link'}  onClick={changeTab}>Completed</span>
                    </li>
                </ul>
            </div>
            

            {
                data.map((item,idx) => (
                    <div className='card my-3 p-3' key={item._id}>
                        <div className='row'>
                            <div className='col-12 col-md-6'>
                                <p><span className='font-weight-bold'>Start Date :</span> <span className='text-primary'>{moment(item.startDate).format('LLLL')}</span></p>
                            </div>
                            <div className='col-12 col-md-6'>
                                <p><span className='font-weight-bold'>Deadline :</span> <span className='text-danger'>{moment(item.deadline).format('LLLL')}</span></p>
                            </div>
                        </div>
                        <div className='mb-1'>
                            <h5>Status : {renderTimer(item.status,item.startDate,item.deadline)}</h5>
                        </div>
                        <div className='dropdown-divider' style={{borderTop : '1px solid black'}}></div>
                        <div>
                            <h4>{item.title}</h4>
                            <h5>{item.subtitle}</h5>
                        </div>

                        <div className='card-body'>
                            <h6>Description</h6>
                            <p>{item.description}</p>
                        </div>

                        <div className='row'>
                            <div className='col-12 col-md-6 mb-3'>
                                {renderAction(item.status,item._id)}
                            </div>
                            <div className='col-12 col-md-6'>
                                <Link className='btn btn-primary' to={{
                                    pathname  : `/schedule`,
                                    state : data[idx]
                                }}>Edit</Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </React.Fragment>
    )
    else return <div className='alert alert-danger text-center'>You have no Auth to access,
                <a href={`/collection/join/${props.match.params.id}`}> Join this Collection instead</a>
                </div>
}