// Setting redux store for projects 

export const SET_PROJECTS = (projects) =>{
    return {
        type: "SET_PROJECTS",
        projects : projects,
    };
    // tHIS WILL RETURN THE OBJECT OF TYPE => SET_USER
    // and returning Data as USER 
};
export const SET_PROJECTS_NULL = () => {
    return {
        type: "SET_PROJECTS_NULL",
        
    }
}