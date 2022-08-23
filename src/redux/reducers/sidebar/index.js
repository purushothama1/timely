const initialState = {
    projectList:[]
  }
  
  const fetchProjectListReducer = (state = initialState, action) => {
    switch (action.type) {
      case "PROJECT_LIST":
        return {
            projectList: [...action.data]
        }
        case "PROJECT_LIST-CLEAR":
          return{
            projectList: []
          }

      default:
        return state
    }
  }
  
  export default fetchProjectListReducer