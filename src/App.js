import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home, NewProject, Projects } from './container'
import { auth, db } from './config/firebase.config';
import { Query, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { Spinner } from './components';
import { useDispatch } from 'react-redux';
import { SET_USER } from './context/actions/userActions';
import {SET_PROJECTS} from './context/actions/projectsActions'

const App = () => {
// use effect  to get the authenication info .it takes 
//2 parameter - call back function , io dependency injection 
//useEffect(()=>{},[]) on auth change we get userCredentials 
const navigate = useNavigate();
const [isLoading, setisLoading] = useState(true)

//For Store , using useDisptach hook to disptach the action

const dispatch = useDispatch()
// USER OBJECT REDUX 
useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(userCred => 
    {
           if(userCred) // if i have user object then 
           {
            //If user is sucesfull authenticated we will transfer them to Firebase db 
            setDoc(doc(db,"users", userCred?.uid),userCred?.providerData[0]).then(()=> {
              //So here we have Data object 
              //Meanwhile our IsLoading Icon Scrolls(isLoading)
              // we will dispatch action to redux store
               dispatch(SET_USER(userCred?.providerData[0]));
               navigate("/home/projects", {replace: true});
              
            })
             console.log(userCred);
             console.log(userCred?.providerData[0]);
             //The provider data will contain UID field that is unique for each account 
            // debugger;
           }
           else{
            // if user is not authenticated
            navigate("/home/auth", {replace : true});
           }
setInterval(() => {
  setisLoading(false); // after 2 second Loading icon Animation removes
}, 2000);

    });
    //clean up listner event unsubscribe
    return () => unsubscribe(); 

},[]);




// PROJECT OBJECT REDUX 
useEffect(()=>{
  //USING qUERY METHORD OF fIREBASE . AND COLLECTION NAME IS Projects WHICH WE PASSED SAME IN NewPrject.jsx to store the Project data in firebase . db is database object 
  const  projectquery = query(collection(db,"Projects"))
  orderBy("id","desc") // oder on based of Id and Id contain date and time stamp . so newly created project are shown at top

  // Then using qury snapshot event listner  to get the latest data from Firebase
  // we run the  projectquery to get the querySnaps
  // from qury dsnap we will get docs and then use map to get signle doc and get data from each doc then disptach  List to SET_PROJECTS
  const unsubscribe = onSnapshot(projectquery, (querySnaps) => {
    const projectList = querySnaps.docs.map((doc) => doc.data());
    dispatch(SET_PROJECTS(projectList));
  } );

 return unsubscribe; // break listner event 
},[]);
  return(
    <>
    {/* Loading icon Animation - Using spinner animation pacakage  */}
 {isLoading ? (
  <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
  <Spinner/>
 </div> ):
 ( 
 <div className="w-screen h-screen  flex items-start justify-start overflow-hidden">

{/* ***************************************************************** */}
{/* ************Configuring Routes **************************************************** */}
{/* ***************************************************************** */}


<Routes>

<Route path="/home/*" element={<Home/>}/>
{/* When in URL user hits /home/... then it will open Home component*/}


{/* Intialliy user website routes to deafult root => http://localhost:3000
So to change default route and redirect to 
home page => http://localhost:3000/home   we use Navigate option  
Thus now if user hits => http://localhost:3000 
it will rdirect to home route => http://localhost:3000/home  */}


{/*  it takes to Url  http://localhost:3000/newProject  As user click Start coding button*/}
<Route path='/newProject' element={<NewProject/>}/>
<Route path='/newProject/:mode/:id' element={<NewProject/>}/>


<Route path="*" element ={<Navigate to={"/home"}/>} />
  </Routes>
  

  </div> 
)}


    </>
    
  );
};

export default App;