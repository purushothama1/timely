import axios from "axios"
import config from "../../../configs/properties";
import {
  toast
} from "react-toastify"

export const getProjectOverViewInfo = async (params) => {
  const PROJECT_OVERVIEW_INFO = await axios.post(config.base_url + "v1/project-overview-info", params);
  return async dispatch => {
    if (PROJECT_OVERVIEW_INFO.statusCode == 200) {
      return dispatch({
        type: "GET_PROJECT_OVERVIEW_DATA",
        data: PROJECT_OVERVIEW_INFO.data.result
      })
    }
  }
}

export const getProjectOverView_members = async (params) => {
  const PROJECT_OVERVIEW_MEMBER_INFO = await axios.post(config.base_url + "v1/project-overview-team-members", params);
  // console.log("PROJECT MEM", PROJECT_OVERVIEW_MEMBER_INFO)
  return async dispatch => {
    if (PROJECT_OVERVIEW_MEMBER_INFO.data.statusCode == 200) {
      return dispatch({
        type: "GET_PROJECT_OVERVIEW_MEMBERS",
        data: PROJECT_OVERVIEW_MEMBER_INFO.data.result
      })
    }
  }
}

export const project_over_view_sprint_task_info = async (params) => {
  const PROJECT_OVERVIEW_SPRINT_TASK_INFO = await axios.post(config.base_url + "v1/project-over-view-sprint-task-info", params);
  // console.log("PROJECT SPRINT TASK", PROJECT_OVERVIEW_SPRINT_TASK_INFO)
  return async dispatch => {
    if (PROJECT_OVERVIEW_SPRINT_TASK_INFO.data.statusCode == 200) {
      return dispatch({
        type: "PROJECT_OVERVIEW_SPRINT_TASK_INFO",
        data: PROJECT_OVERVIEW_SPRINT_TASK_INFO.data.result
      })
    }
  }
}

export const project_over_view_planned_vs_actual_sprint_tasks = async (params) => {
  const PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO = await axios.post(config.base_url + "v1/project-over-view-sprint-task-info", params);
  // console.log(" PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO", PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO)
  return async dispatch => {
    if (PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO.data.statusCode == 200) {
      return dispatch({
        type: "PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO",
        data: PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO.data.result
      })
    }
  }
}
