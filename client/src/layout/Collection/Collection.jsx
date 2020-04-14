import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import CreateCollection from './CreateCollection';
import Auth from '../../modules/Auth';

export default function Collection(){
    const [colls,setColls] = React.useState([]);
    const[create,setCreate] = React.useState(false)
    async function getData(){
        try {
            let res = await axios.get('/collection/view');
            setColls(res.data);
        } catch(err){
            console.log(err)
        }        
    }
    const handleClick = (id) =>{
        window.location.href = `/collection/${id}`
    }
    const toogle = () =>{
        setCreate(!create)
    }
    
    React.useEffect(()=>{
        getData();
    },[create])

    

    function copyToClipboard(id) {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        document.execCommand('copy');
        dummy.setAttribute("id", id);
        document.getElementById(id).value=`${window.location.origin}/collection/join/${id}`;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    };

    return(
        <React.Fragment>
            <h1>My Collection</h1>
            {
                <div className='my-4'>
                    <button className='btn btn-primary' href='/collection/create' onClick={toogle}>+ Create new Collection</button>
                </div>
            }        
            
            <div className='p-4 my-4'>
                {
                    create && <CreateCollection close={toogle}/>
                }
            </div>
            <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Collection Name</th>
                    <th>Pin</th>
                    {
                        Auth.isAdmin() &&
                        <th>Action</th>
                    }                    
                </tr>
            </thead>
            <tbody>
            {
                colls.map((coll,idx) =>(
                    <tr key={coll._id}>
                        <td onClick={()=>handleClick(coll._id)}>{coll.name}</td>
                        <td onClick={()=>handleClick(coll._id)}>{coll.pin}</td>
                        {
                            Auth.isAdmin() && 
                            <td><Link className='btn btn-primary'
                                to={
                                    {
                                        pathname : '/collection/edit',
                                        state : colls[idx]
                                    }
                                }    
                            >Edit</Link>
                            <Link className='btn btn-primary mx-2' to={`/collection/join/${coll._id}`}>Join</Link>
                            <button className='btn btn-primary mx-2' onClick={(e)=>copyToClipboard(coll._id)}>Copy link</button>
                            </td>
                        }
                        
                    </tr>
                ))
            }    
            </tbody>
            </table>            
        </React.Fragment>
    )
}
