import axios from "axios";
// import { toast } from "react-toastify";
import config from "../../../configs/properties";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem("token");

const toastConfig={
  position: "bottom-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  }

export const getAllProjectData = (pagecount=1,pagelimit=10) => async (dispatch) => {
  console.log(pagecount);
  // const Pages={page:pagecount}
  try {
    const response = await axios.post(config.base_url + "v1/statistics/findAll",{page:pagecount,limit:pagelimit});
    if (response?.data?.statusCode === 200)
    return dispatch({
      type: "GET_ALL_PROJECT_DETAILS",
      payload: response.data.data,
      count:(response.data.count/10)+pagecount
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOrgLevelData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      config.base_url + "v1/statistics/findOrgStatistics"
    );
    if (response?.data?.statusCode === 200)
      return dispatch({
        type: "GET_ORG_LEVEL_DETAILS",
        payload: response.data.data[0],
      });
    else {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addNewKpiProject = (newKpi) => async (dispatch) => {
  try {
    const response = await axios.post(
      config.base_url + "v1/statistics/create",
      newKpi,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.message === "statistic added"
    )
      return dispatch({ type: "ADD_NEW_KPI", payload: response.data.data });
  } catch (err) {
    console.log(err);
  }
};

export const editKpiPoject = (editKpi) => async (dispatch) => {
  try {
    const response = await axios.put(
      config.base_url + "v1/statistics/update",
      editKpi,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );
    if (response?.data?.statusCode === 200) 
    toast.success('The Changes Recorded Successfully', toastConfig);
    // dispatch(getAllProjectData())
    return dispatch({ type: "EDIT_CURRENT_KPI", payload: editKpi});
  } catch (err) {
    console.log(err);
    toast.error('sorry could not connect to server', toastConfig);
  }
};
