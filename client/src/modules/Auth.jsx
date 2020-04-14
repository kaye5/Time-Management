import Axios from "axios";
import jwt  from 'jwt-decode';
class Auth {
    static authenticateUser() {
      localStorage.setItem('user',{name : "Dummy"});      
    }
    static isAdmin(){
      let data = jwt(localStorage.getItem('user'))
      if(data.user.role === 'admin')
        return true
      return false
    }
    static isUserAuthenticated() {
      if(localStorage.getItem('user') !== null){
        Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('user')}`
        return true 
      }
      return false
    }
    static async isParticipant(collectionID) {
      try {
        let res = await Axios.put('/collection/participant/validate',{collectionID})
        if(res.data){
          return true;
        }
      }catch(err){
        console.log(err)
        return false
      }      
    }

    static deauthenticateUser() {
      localStorage.removeItem('user');
    }
  
  }
  
  export default Auth;