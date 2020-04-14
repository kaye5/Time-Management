import React from 'react'
import {Switch,Route,withRouter} from "react-router-dom";
import Collection from '../layout/Collection'
import EditCollection from '../layout/Collection/EditCollection'
import Login from "../layout/Login/Login";
import CreateAccount from "../layout/Login/CreateAccount";
import { UserPrivateRoute } from './UserPrivate';
import JoinCollection from '../layout/Collection/JoinCollection';
import Schedule from '../layout/Schedule/Schedule';
import ScheduleDetail from '../layout/Schedule/ScheduleDetail';
import CreateSchedule from '../layout/Schedule/CreateSchedule';
import Logout from '../layout/Login/Logout';
import Home from '../layout/Home';

function MainRoute(){
    return(
        <Switch>
            
            <UserPrivateRoute exact path='/schedule' component={(props) => <ScheduleDetail {...props} />} />
            <UserPrivateRoute  path='/schedule/create' component={(props) => <CreateSchedule {...props} />} />
        
        
            <UserPrivateRoute  path='/collection/join/:id' component={(props)=><JoinCollection {...props}/>}/>
            <UserPrivateRoute  path='/collection/edit' component={(props)=><EditCollection {...props}/>}/>
            <UserPrivateRoute  path='/collection/:id' component={(props) => <Schedule {...props} />} />
            <UserPrivateRoute exact path='/collection' component={()=><Collection />}/>
            
            <Route exact path='/login' component={()=> <Login /> } />
            <Route exact path='/' component={()=> <Home /> } />
            <Route exact path='/logout' component={()=> <Logout /> } />
            <Route exact path='/create' component={()=> <CreateAccount /> } />
        </Switch>
    )
}

export default withRouter(MainRoute);