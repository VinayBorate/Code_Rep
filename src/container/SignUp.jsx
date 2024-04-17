import React, { useState } from 'react'
import { UserAuthInput } from '../components'
import { FaEnvelope, FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { MdPassword } from 'react-icons/md'
import {AnimatePresence, motion} from "framer-motion"
import { signInWithGithub, signInWithGoogle } from '../utils/helper'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'
import { fadeInout } from '../animation'
import { Logo } from "../assets";
const SignUp = () => {
 
  
  // to minitor state of input value of  email and  passsword . Set "" as intially they are empty 
  //Used in UserAuthInput
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  
  const [getEmailValidationStatus, setgetEmailValidationStatus] = useState(false)

  // is the user logged in ? 
  const [isLogin, setisLogin] = useState(false)
  //alert states
  const [alert, setalert] = useState(false)
  const [alertMsg, setalertMsg] = useState("")

// For Sign up button new user creation
const createNewUser = async() => {
 // debugger;
  if(getEmailValidationStatus)
  {
    await createUserWithEmailAndPassword(auth , email , password).then
    (userCred =>{
      if(userCred)
      {
        console.log(userCred)
        // once email is created it will trugger onAuth state change listetner
        //which we configure in APP.JS  SO USER WILL BE NAVIGATED TO SCREEN 
      }
    }).catch((err)=> {
      console.log(err.message);
    if(err.message.includes("invalid-credential"))
    {
      setalert(true)
      setalertMsg("Invalid Id : User Not Found")
    }
    else if(err.message.includes("invalid-email"))
    {
      setalert(true)
      setalertMsg("Enter Proper Email")
    }
    else if(err.message.includes("email-already-in-use")){
      setalert(true)
      setalertMsg("User Already Registered")
    }
    else if (err.message.includes("weak-password"))
    {
      setalert(true)
      setalertMsg("Password should be at least 6 characters")
    }
    else{
      setalert(true)
      setalertMsg("Account Temporary Blocked : Try Again")
    }
    //Turning alert off after 4 sec
    setInterval(() => {
      setalert(false);
    }, 4000);
    });

  }
  else
  {
    setalert(true)
      setalertMsg("Enter Proper Email")
  }
  //Turning alert off after 4 sec
  setInterval(() => {
    setalert(false);
  }, 4000);
  
};


// For Login in Button with email and password 
const loginWithEmailPassword = async() => {
   //debugger;
  if(getEmailValidationStatus)
  {
    await signInWithEmailAndPassword(auth,email,password).then
    (userCred =>{
     
      if(userCred)
      {
        console.log(userCred)
        // once email is created it will trugger onAuth state change listetner
        //which we configure in APP.JS  SO USER WILL BE NAVIGATED TO SCREEN 
      }
    }).catch((err)=> {
      console.log(err.message);
    if(err.message.includes("invalid-credential"))
    {
      setalert(true)
      setalertMsg("Invalid Id : User Not Found")
    }
    else if(err.message.includes("invalid-email"))
    {
      setalert(true)
      setalertMsg("Enter Proper Email")
    }
    else if(err.message.includes("email-already-in-use")){
      setalert(true)
      setalertMsg("User Already Registered")
    }
    else{
      setalert(true)
      setalertMsg("Account Temporary Blocked : Try Again")
    }
    //Turning alert off after 4 sec
    setInterval(() => {
      setalert(false);
    }, 4000);
    });

  }
};



  return (
  // SIGN UP PAGE => http://localhost:3000/home/auth
  <div className='w-full py-6'>
  
  
  {/* LOGO  */}
  <img className='w-32 h-auto object-contain' src={Logo}/>
 {/* SIGN UP BOX */}
 
{/* EMAIL FIELD */}
{/* PASSWORD */}
{/* ALERT */}
{/* LOGINBUTTON  */}
{/* TEXT SECTION  */}
{/* OR SECTION  */}
{/*  SIGN WITH GOOGLE */}
{/*  OR SECTION*/}
{/* SIGN WITH GITHUB */}
{/* For this lets create a componets folder to hold all above ones   */}

<div className="w-full flex flex-col items-center justify-center py-8">
<p className='py-12 text-2xl text-primaryText'>Join with Us !</p>
<div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>


{/* EMAIL FIELD */}
{/* Passing value from USer input as Props to function . Key is unique to make it unique prop. Send StateFunction to update the States  */}
<UserAuthInput label="Email" placeHolder="Email" isPass={false} key="Email" setStateFunction={setEmail} Icon={FaEnvelope} setgetEmailValidationStatus={setgetEmailValidationStatus}/>

{/* PASSWORD FIELD */}
<UserAuthInput label="Password" placeHolder="Password" isPass={true} key="Password" setStateFunction={setPassword} Icon={MdPassword}/>

{/* alert section  */}
{/* we define 3 animation sates - initial, animate, exit in Animation folder fadeeiNout () */}
{/* Animate presence will wait till exit animation is performed succesfully. WE WILL DISPLAY ALERY WHEN alert is true   */}
<AnimatePresence>
  {alert && (
    
    <motion.p  key="AlertMessage" {...fadeInout} className='text-red-500'>{alertMsg}
</motion.p>

  )}

</AnimatePresence>


{/* LOGINBUTTON  */}
{/* {!isLogin ?
<motion.div> TRUE </motion.div> : <motion.div>FALSE</motion.div>
} */}

{!isLogin ? (
  <motion.div onClick={createNewUser} whileTap={{scale: 0.9}} className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500">
 <p className='text-xl text-white'>Sign Up</p>
</motion.div>
):(
 <motion.div onClick={loginWithEmailPassword} whileTap={{scale: 0.9}} className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500">
 <p className='text-xl text-white'>Login </p>
</motion.div>
)}

{/* TEXT SECTION  */}


{!isLogin ? (
<motion.div>
<p className='text-sm text-primaryText flex items-center justify-center gap-3'>Already Have an Account ! <span  onClick={()=>setisLogin(!isLogin)} className='text-emerald-500 cursor-pointer'>Login Here</span></p>
</motion.div> 
):( 
<motion.div>
<p className='text-sm text-primaryText flex items-center justify-center gap-3'>Doesn't Have an Account ! <span onClick={()=>setisLogin(!isLogin)} className='text-emerald-500 cursor-pointer'>Create Here</span></p>
</motion.div>
)}

{/* OR SECTION  */}

<div className='flex items-center justify-center gap-12'>
<div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
<p className='text-sm bg-[rgba(256,256,256,0.2)]'>OR</p>
<div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
</div>

{/*  SIGN WITH GOOGLE */}
<motion.div  onClick={signInWithGoogle} className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer' whileTap={{scale: .9}}> 
<FcGoogle className='text-3xl'/>
<p className='text-xl text-white'>Sign in with Google</p>
 </motion.div>

{/*  OR SECTION*/}

<div className='flex items-center justify-center gap-12'>
<div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
<p className='text-sm bg-[rgba(256,256,256,0.2)]'>OR</p>
<div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24'></div>
</div>


{/* SIGN WITH GITHUB */}
<motion.div onClick ={signInWithGithub} className='flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer' whileTap={{scale: .9}}> 
<FaGithub className='text-3xl text-white'/>
<p className='text-xl text-white'>Sign in with GitHub</p>
 </motion.div>



</div>


</div>


    </div>
  )
}

export default SignUp