// this function takes state and action  
const projectReducer =(state = null , action) => {
 switch(action.type)
    {
        case "SET_PROJECTS": 
            return{
                ...state, 
                projects: action.projects,
                // but if we pass 
            }
            case "SET_PROJECTS_NULL": 
            return{
                ...state, // set state
                projects: null // keep user null 
            };
            default : 
            return state
    }
};
export default projectReducer;