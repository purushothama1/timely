const initialState ={
    result:[]
}

const ReadytoonboardListReducer = (state = initialState , action)  => {
    switch(action.type){
        case "GET_READY_TO_ONBOARD":
            return{
                result:[...action.data],
                totalPages: Math.round(action.totalUsers / action.params)
            }


            default:
                return state
            }
    }

    export default ReadytoonboardListReducer