const initialState = {
  data: ["ABCD"]
}

const projectOverViewReducer = (state = initialState, action) => {
  // console.log("GET_PROJECT_OVERVIEW_DATA in reducer", action)
  switch (action.type) {
    case "GET_PROJECT_OVERVIEW_DATA":
      return {
        data: action.data
      }
      break;

    case 'GET_PROJECT_OVERVIEW_DATA_REQ':
      return {
        data: []
      }
      break;

    case 'GET_PROJECT_OVERVIEW_MEMBERS':
      return {
        data: []
      }
      break;

    case 'PROJECT_OVERVIEW_SPRINT_TASK_INFO':
      return {
        data: []
      }
      break;

    case 'PROJECT_OVERVIEW_PLANNED_ACTUAL_SPRINT_TASK_INFO':
      return {
        data: []
      }
      break;
    default:
      return state
  }
}

export default projectOverViewReducer
