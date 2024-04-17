// we need 2 different actions 
//1) push data to states
//2) remove data from state 

export const SET_USER = (user) =>{
    return {
        type: "SET_USER",
        user : user,
    };
    // tHIS WILL RETURN THE OBJECT OF TYPE => SET_USER
    // and returning Data as USER 
};
export const SET_USER_NULL = () => {
    return {
        type: "SET_USER_NULL",
        
    }
}