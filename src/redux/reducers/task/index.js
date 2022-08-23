const initialState = {
    tasks:[],
    sprintData: {},
    sprintmemebers: {}
  }
  
  const taskListReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_TASK_DATA":
        return {
            tasks:[...action.data.task],
            // sprintData: {...action.data.sprintDetails},
            // sprintmemebers: {...action.data.sprintmemebers},
            totalPages: Math.ceil(action.sprintsCount / action.params)
        }

        case "GET_MY_TASK_DATA":
        return {
            tasks:[...action.data],
            // sprintData: {...action.data.sprintDetails},
            // sprintmemebers: {...action.data.sprintmemebers},
            totalPages: Math.ceil(action.sprintsCount / action.params)
        }

        case "GET_OTHERS_TASK_DATA":
        return {
            tasks:[...action.data],
            // sprintData: {...action.data.sprintDetails},
            // sprintmemebers: {...action.data.sprintmemebers},
            totalPages: Math.ceil(action.sprintsCount / action.params)
        }

        case "GET_OPEN_TASK_DATA":
        return {
            tasks:[...action.data],
            // sprintData: {...action.data.sprintDetails},
            // sprintmemebers: {...action.data.sprintmemebers},
            totalPages: Math.ceil(action.sprintsCount / action.params)
        }
        case "GET_SPRINT_MEMBERS_DATA":
          return {
              sprintData: {...action.data.sprintDetails},
              sprintmemebers: {...action.data.sprintmemebers}
          }

        case "DELETE_TASK_DATA":
          return{
            tasks: [...state.tasks.filter(tasks=>tasks._id != action.data)],
            sprintData: {...action.data.sprintDetails},
            sprintmemebers: {...action.data.sprintmemebers}
          }
      
    
      case "ADD_TASK_DATA":
        return {
            tasks: [...state.tasks, action.data],
            sprintData: {...state.sprintData},
            sprintmemebers: {...state.sprintmemebers}
        }

      case "UPDATE_TASK_DATA":
        let index = state.tasks.findIndex(ind => ind._id === action.data[0]._id)
        return {
            tasks:[...state.tasks.slice(0, index), action.data[0], ...state.tasks.slice(index+1)],
            sprintData: {...state.sprintData},
            sprintmemebers: {...state.sprintmemebers}
        }

      default:
        return state
    }
  }
  
  export default taskListReducer