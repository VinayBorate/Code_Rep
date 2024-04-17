import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa6";
import {motion} from "framer-motion";

//******** */ to make it resuable compoent we will use props ********
// We will use following props=> label,placeHolder,isPass,setStateFunction,Icon
const UserAuthInput = ({label,placeHolder,isPass,setStateFunction,Icon,setgetEmailValidationStatus}) => {
  
// Getting the value of email onchnage() so we capture that email field input state
    const [value, setValue] = useState("")

//initally show password is false so password is hidden else dislay it on click of eye button
const [showPass, setShowPass] = useState(false)

//State to check email is valid or not by help of regular expression
const [isEmailValid, setIsEmailValid] = useState(false)

//Function to validate email
const handleTextChnage =(e) =>
{
   // debugger;
    console.log(e);
    setValue(e.target.value) // this will update the value of state => value
    setStateFunction(e.target.value) // WILL UPDATE VALUES TO STATES email and password 

    //cheking value from email or password
     //using regular expression 
     if(placeHolder==="Email")
     {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const status = emailRegex.test(value)
        //if valid email staus = true else false 
        setIsEmailValid(status) // this will update the state => isEmailValid
        setgetEmailValidationStatus(status) // this will update value of getEmailValidationStatus on SignUp.jsx
    }

}

    return (
    <div className="flex flex-col items-start justify-start gap-1">
    {/* EMAIL (Passing as prop {label} received from SignUp.jsx ) */}
    <label className="text-sm text-gray-300 ">{label}</label>
  <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 py-1 bg-slate-200 ${!isEmailValid && placeHolder=="Email" && value.length>0 && "border-2 border-red-500"}`}>

{/* EMAIL ICON */}
<Icon className="text-text555 text-2xl"/> 
{/* Icon Is prop here passed from SignUp.jsx */}

{/* Geeting the value from email Input by usestate So whathever use enters is stored in {value} . This is done by capturing state of Email field */}
{/* Also we are getting the value of props from SignUp.jsx */}
<input type={isPass && showPass ? "password" : "text"} placeholder={placeHolder} className="flex-1 w-full h-full py-2 outline-none border-none bg-transparent text-text555 text-lg" value={value} onChange={handleTextChnage}/>
  
  {/* EYE ICON */}
  {/* will display eye icon based on  value based on prop if email then no eye but for password we need eye. so make 2 different ststes to minotor email and password in Signup.jsx   */}
  {/* So eye Button is not displyed on Email field */}
  
  {isPass && (
    <motion.div onClick={() => setShowPass(!showPass)} whileTap={{scale : 0.9}} className="cursor-pointer">
    
    {/* So intallyif Show pass is false as as user click on eye button then icon of ey button chnages from eye to eyeslash  and On basis of onclick we chnage value of showPass */}
    {showPass ? (<FaEyeSlash className="text-text555 text-2xl"/>) : (<FaEye className="text-text555 text-2xl"/>)} 

    
    
    </motion.div>

  )}
  
  

  
  </div>

  </div>
  )
}

export default UserAuthInput;