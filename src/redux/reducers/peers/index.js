const initialState = {
    peers:[]
  }
  
  const PeerListReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_PEER_DATA":
        return {
            peers:[...action.data],
            totalPages: Math.ceil(action.peersCount / action.params)
        }

        case "DELETE_PEER_ROW":
          return{
            peers: [...state.peers.filter(peer=>peer._id != action.data)]
          }
      
    
      case "ADD_PEER_DATA":
        return {
            peers:[...state.peers, action.data]
        }
      case "UPDATE_PEER_DATA":
        let index = state.peers.findIndex(ind => ind._id === action.data._id)
        return {
            peers:[...state.peers.slice(0, index), action.data, ...state.peers.slice(index+1)]
        }
      default:
        return state
    }
  }
  
  export default PeerListReducer
  