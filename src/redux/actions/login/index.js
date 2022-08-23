import axios from "axios"
import { toast } from "react-toastify"
import { history } from "../../../history"
import queryString from 'query-string'
import swal from 'sweetalert';
import config from "../../../configs/properties";

export const loginData = (params, props) => {
    
  return async dispatch => {
   const loginRequest = await axios.post(config.base_url + "v1/adminlogin",params
   )
   if(loginRequest.data.statusCode == 200)
   { 
   dispatch({
    type: "LOGIN_REQUEST",
    data: loginRequest.data.resData,
    })
    
    localStorage.setItem('company',loginRequest.data.resData.company)
    localStorage.setItem('username',loginRequest.data.resData.userName)
    localStorage.setItem('adminaccess',loginRequest.data.resData.adminAccess)
    localStorage.setItem('userProfilePic',loginRequest.data.resData.userProfilePic)
    localStorage.setItem('user',loginRequest.data.resData.user)
    localStorage.setItem('token',loginRequest.data.resData.token)

    const value=queryString.parse(props.location.search);
    if(value.data){
      history.push('/consensus?data='+value.data)
    }
    else{
      history.push('/dashboard')
    }
   }
   else{
        swal(loginRequest.data.message,"","info"); 
   }
  }
}