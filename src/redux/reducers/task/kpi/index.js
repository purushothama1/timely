const initialState = {
  kpiData: [],
};

const KpiDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_KPI_DATA":
      return {
        ...state,
        kpiData: [...action.data],
      };

    default:
      return state;
  }
};

export default KpiDataReducer;
