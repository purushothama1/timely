const initialState = {
    projects:[],
    totalPages: 0,
    projectsCount: 0,
    perPage: 0
  }
  

  
  const ProjectListReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PROJECT_DATA":
        return {
            projects:[...action.data],
            totalPages: Math.ceil(action.projectsCount / action.params),
            projectsCount: action.projectsCount,
            perPage: action.params
        }

        case "DELETE_PROJECT_ROW":
          return{
            projects: [...state.projects.filter(proj=>proj._id != action.data)],
            totalPages: Math.ceil((state.projectsCount - 1)  / state.perPage)
          }
          
      case "ADD_PROJECT_DATA":
        return {
          projects:[...state.projects,action.data],
          totalPages: Math.ceil((state.projectsCount + 1)  / state.perPage)
        }

      case "UPDATE_PROJECT_DATA":
      let index = state.projects.findIndex(ind => ind._id === action.data[0]._id)
        return {
          projects:[...state.projects.slice(0, index), action.data[0], ...state.projects.slice(index+1)],
          totalPages: Math.ceil(state.projectsCount / state.perPage),
        }
      
    
      default:
        return state
    }
  }

  export default ProjectListReducer
  