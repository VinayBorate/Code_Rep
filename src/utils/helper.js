import { GithubAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"

import { auth } from "../config/firebase.config"

import { v4 as uuidv4 } from 'uuid';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

//GOOGLE aUTHENTICATION 
// signInWithRedirect  takes 2 paramter => auth token and provider info
    // after this => (signInWithRedirect(auth,googleProvider)) is  
    //success and promise is returned then we will get userCred
    // then we reload , Also  firebase provides  onAuth state change which listens 
    //continosuly for active  session token state..
    //AFTER AUTHETYICATION IT WILL RETURN US TO HOME 
    // SCREEN  localhost/home/auth or App.js
    //so after calling this function on Signup.jsx we will access it on Home.jsx
export const signInWithGoogle = async () =>{
    await signInWithRedirect(auth,googleProvider).then(userCred => {
        window.location.reload();
    });
};



// Github Authentication

export const signInWithGithub = async () =>{
    await signInWithRedirect(auth,githubProvider).then(userCred => {
        window.location.reload();
    });

    //AFTER AUTHETYICATION IT WILL RETURN US TO HOME 
    // SCREEN  localhost/home/auth or App.js
    //so after calling this function on Signup.jsx we will access it on Home.jsx

};


// https://www.npmjs.com/package/uuid
//Fo render User menu options  near User image 
export const Menus =[
    { id: uuidv4(), name: "Projects", uri:"/home/projects"},
    
    
];

export const signOutAction = async() => {
    await auth.signOut().then(() =>{
        window.location.reload();
    });
};