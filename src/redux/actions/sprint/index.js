import axios from "axios"
import config from "../../../configs/properties";
import { toast } from "react-toastify"

export const addSprint = (params) => {
    return async dispatch => {
     const addSprintRequest = await axios.post(config.base_url + "v1/addSprint", params)
     if(addSprintRequest.data.statusCode == 200)
     {
      toast.success("Sprint Added Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
     dispatch({
      type: "ADD_SPRINT_DATA",
      data: addSprintRequest.data.result
      })
     }
    }
  }

  export const updateSprint = (params) => {
    return async dispatch => {
     const updateSprintRequest = await axios.post(config.base_url + "v1/editSprints", params)
     if(updateSprintRequest.data.statusCode == 200)
     {
      toast.info("Sprint Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
     dispatch({
       type: "UPDATE_SPRINT_DATA",
       data: updateSprintRequest.data.result
      })
     }
    }
  }

  export const deleteSprint = (params) => {
    return async dispatch => {
     const updateSprintRequest = await axios.post(config.base_url + "v1/deleteSprint", params)
     if(updateSprintRequest.data.statusCode == 200)
     {
      toast.info("Sprint Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
     dispatch({
       type: "DELETE_SPRINT_DATA",
       data: params.sprintId
      })
     }
    }
  }

  export const getSprintData = (params) => {
    return async dispatch => {
     const getSprintRequest = await axios.post(config.base_url + "v1/sprintList", params)
     if(getSprintRequest.data.statusCode == 200)
     {
      dispatch({
        type: "GET_SPRINT_DATA",
        data: getSprintRequest.data.result.sprints,
        sprintScore:  getSprintRequest.data.result.sprintScore,
        sprintsCount:  getSprintRequest.data.result.sprintsCount,
        params: params.size,
        projectName: getSprintRequest.data.result.projectName
      })
      return getSprintRequest
     }
    }
  }
  
  export const searchSprintData = (params) => {
    return async () => {
      try {
        const searchFilter = await axios.post(config.base_url + "v1/searchSprints", params)
        if(searchFilter.data.statusCode == 200)
        {
          return searchFilter.data.Result
        }
      }
      catch(e)
      {}
    }
  }