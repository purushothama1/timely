import axios from "axios";
import config from "../../../configs/properties";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const base_url = "https://timely-backend-server.herokuapp.com";

const getKpiData = (params) => {
  return async (dispatch) => {
    const kpiProjectData = await axios.post(
      base_url + "/v1/statistics/create",
      params,
      {
        headers: {
          "Content-Type": "application/json",
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWVmNWE2M2E1Nzg2YzY3ZTY5NGFkNDBhIiwiaWF0IjoxNjU5NTMyNTgxfQ.OoQzcsLcoPOmgDr27ZQkTf1mCKmsnS2JMynBvzRcOEE",
        },
      }
    );
    if (kpiProjectData.data.statusCode === 200) {
      console.log(kpiProjectData, "project data");
      dispatch({
        type: "KPI_PROJECT_DATA",
        payload: kpiProjectData.data.data,
      });
    }
  };
};



export default getKpiData;



