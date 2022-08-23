import axios from "axios";
import config from "../../../configs/properties";
import {
  toast
} from "react-toastify";

export const In_Progress_Project_Info = (params) => {
  return async dispatch => {
    const INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD = await axios.post(config.base_url + "v1/project-overview-info", params)
    if (INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD.statusCode === 200) {
      dispatch({
        type: "INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD",
        data: INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD.result,
        totalTasks: INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD.totalTasks,
        totalCompletedTasks: INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD.totalCompletedTasks,
        incompleteTasks: INPROGRESS_PROJECT_OVERVIEW_IN_DASHBOARD.incompleteTasks,
      })
    }
  }
}
export const getTodayHeadCount= (todayDate)=>
{
    return async ()=>{
        try{
            const getTodayHeadCounts=await axios.post(config.base_url + "v1/dashboard-today-headcount",todayDate,
         )
          if(getTodayHeadCounts.data.statusCode == 200){
            return getTodayHeadCounts;
          }
        }
        catch(e)
        {}
    }
}



export const getPeopleAvailability= (startDate,endDate)=>
{
    return async ()=>{
        try{
            const getPeopleAvailabilitys=await axios.post(config.base_url + "v1/user-status-office-wfh-nextweek",startDate,endDate,
         )
          if(getPeopleAvailabilitys.data.statusCode == 200){
            return getPeopleAvailabilitys;
          }
        }
        catch(e)
        {}
    }
}

export const getPeopleHostedWeekly= (startDate,endDate)=>
{
    return async ()=>{
        try{
            const getPeopleHostedWeeklys=await axios.post(config.base_url + "v1/user-status-office-vs-wfh",startDate,endDate,
         )
          if(getPeopleHostedWeeklys.data.statusCode == 200){
            return getPeopleHostedWeeklys;
          }
        }
        catch(e)
        {}
    }
}

export const getOngoingProjects = () => {
  return async ()=> {
    try{
      const getOngoingProjects = await axios.post(config.base_url + "v1/ongoing-projects")
      if(getOngoingProjects.data.statusCode == 200){
        return getOngoingProjects;
      }
    }
    catch(e){

    }
  }
}

export const activitySummary = () => {
  return async ()=> {
    try {
      const activitySummary = await axios.post(config.base_url + "v1/project-active-summary")
      if(activitySummary.data.statusCode == 200){
        return activitySummary
      }
    }catch(e){}
  }
}

export const karmaPoints = (startDate,endDate,limit,page,roleIds) => {
  return async () => {
    try {
      const karmaPoints = await axios.post(config.base_url + "v1/karma-points-for-peers-list", startDate,endDate,limit,page,roleIds)
      if(karmaPoints.data.statusCode == 200){
        return karmaPoints
      }

    }catch(e){

    }
  }
}

export const getRoles = (company) =>{
  return async () => {
    try{
      const getRoles = await axios.post(config.base_url + "v1/get-all-roles",company)
      if(getRoles.data.statusCode == 200){
     return getRoles
      }


    } catch(e){

    }
  }
}

export const planedVsactual = (startDate,endDate,projectIds,roleIds)  => {
  return async () =>{
try {
  const planedVsactual = await axios.post(config.base_url + "v1/dashbaord-planned-vs-acual",startDate,endDate,projectIds,roleIds)
  if(planedVsactual.data.statusCode == 200){
    return planedVsactual

  }

} catch (e) {
  
}

  }
}

export const getsprintList = (projectId, startDate,endDate,page,size) => {
  return async () => {
    try {
      const getsprintList = await axios.post(config.base_url + "v1/sprintListByProjectId",projectId, startDate,endDate,page,size)
      if(getsprintList.data.statusCode ==200 ){
        return getsprintList
      }

    }catch (e) {

    }
  }
}

export const dashboard_availablity = (startDate, endDate,projectIds,roleIds) => {
  return async () => {
    try{
      const dashboard_availablity = await axios.post(config.base_url + "v1/dashboard-peers-availability",startDate,endDate,projectIds,roleIds)
      if(dashboard_availablity.data.statusCode == 200){
        return dashboard_availablity
      }
    }catch(e){

    }

  }
}

export const redyto_Onboard = (params) => {
  return async dispatch => {
    const readyto_onboard_request = await axios.post(config.base_url + "v1/dashboard-peers-availability",params)
    if(readyto_onboard_request.data.statusCode == 200){
      dispatch({
        type: "GET_READY_TO_ONBOARD",
        data: readyto_onboard_request.data.result,
        totalUsers: readyto_onboard_request.data.totalUsers,
        params: params.size

      })
    }
  }
}