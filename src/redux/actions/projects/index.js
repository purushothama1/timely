import axios from "axios"
import { toast } from "react-toastify"
import config from "../../../configs/properties";

export const getProjectData = (params) => {
    
  return async dispatch => {
   const projectRequest = await axios.post(config.base_url + "v1/allprojects",params
   )
   if(projectRequest.data.statusCode == 200)
   {
   dispatch({
    type: "GET_PROJECT_DATA",
    data: projectRequest.data.projects,
    projectsCount: projectRequest.data.projectsCount,
    params: params.perPage
    })
   }
  }
}

export const deleteProjectRow = (params) => {
  return async dispatch => {
   const deleteProjectRequest = await axios.post(config.base_url + "v1/removeproject", params)
   if(deleteProjectRequest.data.statusCode == 200)
   {
      toast.info("Project Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT
    })
   dispatch({
    type: "DELETE_PROJECT_ROW",
    data: params.project

   })
  }
  } 
  }
   
export const addProjectData = (params) => {

  return async dispatch => {
   const addprojectRequest = await axios.post(config.base_url + "v1/addproject", params
   )
   if(addprojectRequest.data.statusCode == 200)
   {
    toast.success("Project Added Successfully", {
      position: toast.POSITION.TOP_RIGHT
    })
   dispatch({
    type: "ADD_PROJECT_DATA",
    data: addprojectRequest.data.projectDetails,
   
    })
   }
  }
}

export const updateProjectData = (params) => {

  return async dispatch => {
   const updateprojectRequest = await axios.post(config.base_url + "v1/updateproject", params
   )
   if(updateprojectRequest.data.statusCode == 200)
   {
   dispatch({
    type: "UPDATE_PROJECT_DATA",
    data: updateprojectRequest.data.projectUpdatedDetails,
   
    })
   }
  }
}

export function allteammembers(params)
{
    return async ()=>{

        try{
            const category = await axios.post(config.base_url + "v1/projectoptions",params
            )
            if(category.data.statusCode == 200){
                return category;
            }
        }
        catch(e)
        {

        }
    }
}

export const searchProjectData = (params) => {
  return async ()=> {
    try{
    const searchFilter = await axios.post(config.base_url + "v1/searchProject" ,params)
    if(searchFilter.data.statusCode == 200)
    {
     return searchFilter.data.Result
    }
  }
  catch(e)
  {}
  }
}