import axios from "axios"
import { toast } from "react-toastify"
import config from "../../../configs/properties";


export const fetchAllProjects = (params) => {
    return async dispatch => {
     const allProjectsResult = await axios.post(config.base_url + "v1/fetchAllProjects", params)
     if(allProjectsResult.data.statusCode == 200)
     {
     dispatch({
      type: "PROJECT_LIST",
      data: allProjectsResult.data.result
      })
     }
    }
  }

export const fetchAllProjectsClear = () => {
  localStorage.removeItem("company");
  localStorage.removeItem("username");
  localStorage.removeItem("adminaccess");
  localStorage.removeItem("userProfilePic");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return async dispatch => {
    dispatch({
     type: "PROJECT_LIST-CLEAR",
     data: []
     })
    }
}