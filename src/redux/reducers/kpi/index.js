const initialState = {
  allProjects: [],
  kpiData: {},
  addNewMessage: "",
  editedMessage: {},
  orgLevelData: {},
  editValue: {},
  pagecount:null,
};

const KpiDataReducer = (state = initialState, { type, payload,count }) => {
  
  switch (type) {
    case "KPI_PROJECT_DATA":
      return { ...state, kpiData: payload };

    case "GET_ALL_PROJECT_DETAILS":
      return { ...state, allProjects: payload ,pagecount:Math.ceil(count)};

    case "GET_ORG_LEVEL_DETAILS":
      return { ...state, orgLevelData: payload };

    case "ADD_NEW_KPI":
      return { ...state, addNewMessage: payload };

    case "EDIT_CURRENT_KPI":
      return { ...state, editedMessage: payload };

    case "EDIT_KPI_VALUE":
      return { ...state, editValue: payload };

    default:
      return state;
  }
};

export default KpiDataReducer;
