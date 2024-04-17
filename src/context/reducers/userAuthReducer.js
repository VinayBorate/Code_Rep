// this function takes state and action  
const userAuthReducer =(state = null , action) => {

    switch(action.type)
    {
        case "SET_USER": // see UserAction.js if action == SET_USER then  
            return{
                ...state, // set state as it is. 
                user: action.user //Set User  from action payload . So USER Lies in => user.user 
                // but if we pass 
            }
            case "SET_USER_NULL": // see UserAction.js if action == SET_USER then  
            return{
                ...state, // set state
                user: null // keep user null 
            }
            default : 
            return state
    }
}
export default userAuthReducer;