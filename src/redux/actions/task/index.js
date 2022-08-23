import axios from "axios";
import config from "../../../configs/properties";
import { toast } from "react-toastify"

export const companyRolesPeers= (params)=>
{
    return async ()=>{
        try{
            const companyRolesPeersRequest=await axios.post(config.base_url + "v1/projectRolesPeers",params,
         )
          if(companyRolesPeersRequest.data.statusCode == 200){
            return companyRolesPeersRequest;
          }
        }
        catch(e)
        {}
    }
}

export const fetchCompanyActivities= (params)=>
{
    return async ()=>{
        try{
            const companyActivityRequest=await axios.post(config.base_url + "v1/fetchCompanyActivities",params,
         )
          if(companyActivityRequest.data.statusCode == 200){
            return companyActivityRequest.data.result;
          }
          else if(companyActivityRequest.data.statusCode == 204){
            return []
          }
        }
        catch(e)
        {}
    }
}

export const predictDate= (params)=>
{
    return async ()=>{
        try{
            const predictDateRequest=await axios.post(config.base_url + "v1/predictaskcompletiondate",params,
         )
          if(predictDateRequest.data.statusCode == 200){
            return predictDateRequest.data;
          }
        }
        catch(e)
        {}
    }
}

export const applyPredictedDate= (params)=>
{
    return async ()=>{
        try{
            const applyPredictedDateRequest=await axios.post(config.base_url + "v1/updatepredicteddetailsfromadmin",params,
         )
          if(applyPredictedDateRequest.data.statusCode == 200){
            return applyPredictedDateRequest.data;
          }
        }
        catch(e)
        {}
    }
}

export const recognizePeer= (params)=>
{
    return async ()=>{
        try{
            const recognizePeerRequest=await axios.post(config.base_url + "v1/addorsharekarmaplusupdatetaskstatustocomplete",params,
         )
          if(recognizePeerRequest.data.statusCode == 200){
            return recognizePeerRequest.data;
          }
        }
        catch(e)
        {}
    }
}

export const continueActivity= (params)=>
{
    return async ()=>{
        try{
            const continueActivityRequest=await axios.post(config.base_url + "v1/updatetaskdetailsandgetkarmaPeersfromadmin",params,
         )
          if(continueActivityRequest.data.statusCode == 200){
            return continueActivityRequest.data;
          }
        }
        catch(e)
        {}
    }
}


export const addTask = (params) => {
    return async dispatch => {
     const addTaskRequest = await axios.post(config.base_url + "v1/addTask", params)
     if(addTaskRequest.data.statusCode == 200)
     {
      toast.success("Task Added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
     dispatch({
      type: "ADD_TASK_DATA",
      data: addTaskRequest.data.result
      })
     }
    }
  }

  export const updateTask = (params) => {
    return async dispatch => {
     const updateTaskRequest = await axios.post(config.base_url + "v1/editTask", params)
     if(updateTaskRequest.data.statusCode == 200)
     {
      toast.info("Task Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
     dispatch({
      type: "UPDATE_TASK_DATA",
      data: updateTaskRequest.data.result
      })
     }
    }
  }

  export const deleteTask = (params) => {
    return async dispatch => {
     const deleteTaskRequest = await axios.post(config.base_url + "v1/deleteTask", params)
     if(deleteTaskRequest.data.statusCode == 200)
     {
      toast.info("Task Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
     dispatch({
      type: "DELETE_TASK_DATA",
      data: params.taskId
      })
     }
    }
  }

  export const sprintDetailsForAdmin = (params) => {
    return async ()=>{
      try{
          const sprintDetailsForAdminRequest=await axios.post(config.base_url + "v1/sprintdetailsforadmin",params,
       )
        if(sprintDetailsForAdminRequest.data.statusCode == 200){
          return sprintDetailsForAdminRequest.data.result;
        }
      }
      catch(e)
      {}
  }
  }

  export const getTaskData = (params) => {
    return async dispatch => {
     const getTaskRequest = await axios.post(config.base_url + "v1/sprintsTask", params)
     if(getTaskRequest.data.statusCode == 200)
     {
     dispatch({
      type: "GET_TASK_DATA",
      data: getTaskRequest.data.result,
      sprintsCount:  getTaskRequest.data.result.tasksCount,
      params: params.size
      })
     }
    }
  }

  export const myToDoTask = (params) => {
    return async dispatch => {
     const myToDoTaskRequest = await axios.post(config.base_url + "v1/allmytasksinsprint", params)
     if(myToDoTaskRequest.data.statusCode == 200)
     {
     dispatch({
      type: "GET_MY_TASK_DATA",
      data: myToDoTaskRequest.data.resData.myTasks,
      sprintsCount:  myToDoTaskRequest.data.resData.myTasksCount,
      params: params.size
      })
     }
     else if(myToDoTaskRequest.data.statusCode == 204){
      dispatch({
        type: "GET_MY_TASK_DATA",
        data: [],
        sprintsCount:  0,
        params: params.size
        })
     }
    }
  }

  export const othersTask = (params) => {
    return async dispatch => {
     const othersTaskRequest = await axios.post(config.base_url + "v1/allotherstasksinsprint", params)
     if(othersTaskRequest.data.statusCode == 200)
     {
     dispatch({
      type: "GET_OTHERS_TASK_DATA",
      data: othersTaskRequest.data.resData.othersTasks,
      sprintsCount:  othersTaskRequest.data.resData.othersTasksCount,
      params: params.size
      })
     }
     else if(othersTaskRequest.data.statusCode == 204){
      dispatch({
        type: "GET_OTHERS_TASK_DATA",
        data: [],
        sprintsCount:  0,
        params: params.size
        })
     }
    }
  }

  export const openTask = (params) => {
    return async dispatch => {
     const openTaskRequest = await axios.post(config.base_url + "v1/allopentasksinsprint", params)
     if(openTaskRequest.data.statusCode == 200)
     {
     dispatch({
      type: "GET_OPEN_TASK_DATA",
      data: openTaskRequest.data.resData.openTasks,
      sprintsCount:  openTaskRequest.data.resData.openTasksCount,
      params: params.size
      })
     }
     else if(openTaskRequest.data.statusCode == 204){
      dispatch({
        type: "GET_OPEN_TASK_DATA",
        data: [],
        sprintsCount:  0,
        params: params.size
        })
     }
    }
  }

  export const uploadExcel = (url,sprint_id,proj_id) =>{
    return async () =>{
      try{
        const excelUploadData = await axios.post(config.base_url + "v1/addsprinttasksfromexcel", {"fileKey":url,"project":proj_id,"sprint":sprint_id})
        return excelUploadData
      }
      catch(e)       
      {}
    }
  }

  export const downloadExcel = (company,proj_id) =>{
    return async () =>{
      try{
        const excelDownloadData = await axios.post(config.base_url + "v1/samplesprintexceldownloadbasedonproject", {"project":proj_id,"company":company})
        return excelDownloadData
      }
      catch(e)       
      {}
    }
  }
  

 export const assignedToSelf = (params) => {
    return async ()=>{
      try{
          const assignedToSelfRequest = await axios.post(config.base_url + "v1/selfassignopentaskfromadmin",params,
       )
       
        if(assignedToSelfRequest.data.statusCode == 200){
          return assignedToSelfRequest.data;
        }
      }
      catch(e)
      {}
  }
  }

  export const statusToStuck = (params) => {
    return async ()=>{
      try{
          const statusToStuckRequest = await axios.post(config.base_url + "v1/updatetaskstatusfromadmin",params,
       )
       
        if(statusToStuckRequest.data.statusCode == 200){
          return statusToStuckRequest.data;
        }
      }
      catch(e)
      {}
  }
  }

  export const searchTaskData = (params) => {
    return async () =>{
      try {
        const searchFilter = await axios.post(config.base_url + "v1/searchTask", params)
        if(searchFilter.data.statusCode == 200)
        {
          return searchFilter.data.Result
        }
      }
      catch(e)
      {}
    }
  }
  
