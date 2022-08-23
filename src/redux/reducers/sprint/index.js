const initialState = {
    sprints:[],
    sprintScore: []
  }
  
  const sprintListReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_SPRINT_DATA":
        return {
            sprints:[...action.data],
            sprintScore: action.sprintScore,
            projectName: action.projectName,
            totalPages: Math.ceil(action.sprintsCount / action.params)
        }

        case "DELETE_SPRINT_DATA":
          return{
            sprints: [...state.sprints.filter(sprints=>sprints._id != action.data)]
          }

      case "ADD_SPRINT_DATA":
        return {
            sprints: [...state.sprints, action.data]
        }
      case "UPDATE_SPRINT_DATA":
        let index = state.sprints.findIndex(ind => ind._id === action.data[0]._id)
        return {
          sprints:[...state.sprints.slice(0, index), action.data[0], ...state.sprints.slice(index+1)]
        }
      default:
        return state
    }
  }
  
  export default sprintListReducer