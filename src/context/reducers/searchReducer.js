// this function takes state and action  
const searchReducer = (state ={searchTerm:""} , action) => {
    //intially dssarch string is emprtty
    switch(action.type)
       {
               case "SET_SEARCH_TERM": 
               return{
                   ...state, 
                   searchTerm: action.searchTerm,
                   // but if we pass 
               }
               case "SET_SEARCH_TERM_EMPTY": 
               return{
                   ...state, 
                   searchTerm: "",
               };
               default : 
               return state
       }
   };
   export default searchReducer;