import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from 'react-icons/fa6';
import { FcSettings } from 'react-icons/fc';
// EDITOR SPLIT PANE 
import SplitPane from 'react-split-pane';
// Code Mirror Packages for HTML CSS JS EDITOR 
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Logo} from "../assets"
import { AnimatePresence ,motion } from 'framer-motion';
import { MdCheck, MdEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Alert, UserProfileDetails } from '../components';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';


// Page structure for HTML CSS JS EDITOR 
/*
1)Alert section 
2)Hedaer Section 
3)Coding scection 
  - Horizontal split-pane
     - Top Coding section 
  - Vertical split-pane
     - Bottom result section 
*/ 


const NewProject = () => {
//debugger;
  const {id} = useParams();
  const {mode} = useParams();
  const  project= useSelector(state=> state.project.projects.filter((project)=> project.id===id)[0]);
console.log(project);
console.log(mode);
 
    // make states to monitor and copy content for HTML CSS JS Editor to get therir value and combine them in order to get Output 
    const [html, sethtml] = useState("")
    const [css, setcss] = useState("")
    const [js, setjs] = useState("")
    const [output, setoutput] = useState("")
    const [isTittle, setisTittle] = useState("")
    const [tittle, settittle] = useState("Untitled")
    const [alert, setalert] = useState(false)
// Hook => useEffect  to call our  updateOutput()  multiple time when there is chnage on html , css , js state

useEffect(()=> {
    updateOutput()
}, [html, css, js])


useEffect(()=> {
  if(mode==="edit")
  {
    sethtml(project.html);
    setcss(project.css);
    setjs(project.js);
    setisTittle(isTittle);
    settittle(tittle);
  }
}, [mode])


//HOOK => useSelector to select the particular stste  value from Redux Store
// since to import user 
const user= useSelector((state) => state.user.user);

    //Bottom result section Output for HTML CSS JS 
    const updateOutput=() => {
        const combineOutput = `
        <html>
        <head>
        <style>${css}</style>
        </head>
        <body>
        ${html}
        <script>${js}</script>
        </body>
        </html> 
        `;
        setoutput(combineOutput); // sending output to output state 
    }

// ASYNCH FUNCTION TO SAVE DATA as user click on save button 
const saveProgram = async () => {
  var id ="" ;
if(mode==="edit")
{
id = project.id;
}
else{
   id = `${Date.now()}`  // creating unique id 
}
    

    // making documnet to store in firebase 
    const _doc ={
        id : id, 
        tittle : tittle, 
        html : html,
        css : css,
        js: js,
        output: output, 
        user : user
    };

    // Now saving this doc in DB by using setDoc() methord of firebase . also Project is Collection naME
    await setDoc(doc(db, "Projects", id),_doc).then((res)=> 
    {// if its success then 
    setalert(true); // soproject saved alert is displyed 
    }).catch((err)=> console.log(err))
  // projects is my collection name , db is firebase db , id, _doc  also we give doc refrence 
  
  setInterval(()=> {
    setalert(false);

  },2000);
  
};

  return (
    <>
<div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
    {/* 1)Alert section  */}
    {/* 2)Header Section  */}
    {/* 3)Coding scection  */}


    <AnimatePresence>
    
        {alert && <Alert status={"Success"} alertMsg={"Project Saved...."} />}
    </AnimatePresence>


{/* Header Section  */}
<header className='w-full flex items-center justify-between px-12 py-4'>

<div className='flex items-center justify-center gap-6'>
<Link to={"/home/projects"}>
 <img className='w-32 h-auto object-contain  lg:pb-14 sm:pb:-25 text-white text-lg' src={Logo}/>
</Link>
<div className='flex flex-col items-start justify-start'>
{/* Tittle - User can edit also byu clicking pen icon*/}

<div className='flex flex-col items-center justify-center gap-3'>   
<AnimatePresence>
    {isTittle ? (
    <> 
    {/* as user click edit icon isTittle becomes true and we get input box to edit its value */}
<motion.input key={"TittleInput"} type='text' placeholder='Your Tittle' className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none' value={tittle} onChange={(e) => settittle(e.target.value)}/>
    </>
    ):(
        <>
            <motion.p key="tittleLabel" className='px-3 py-2 text-white text-lg'>
                {tittle}
            </motion.p>
        </>
        )}
</AnimatePresence>

{/* If tittle is true means user wants to edit it so  we will diplay Tick mark/Check box  else will disply pen icon */}
<AnimatePresence>
    {isTittle ? (
    <>
    {/* AS user click check mark then settittle(false) as user has finished editing title + chnage image  */}
    <motion.div key={"MdCheck"} whileTap={{scale:0.9}} className='cursor-pointer' onClick={() => setisTittle(false)}>
        <MdCheck className='text-2xl text-emerald-500'/>
    </motion.div>
  </>
    ):(
        <>
        {/* AS user click edit/ Pen icon then settittle(true)  */}
        <motion.div key={"MdEdit"} whileTap={{scale:0.9}} className='cursor-pointer' onClick={() => setisTittle(true)}>

  <MdEdit className='text-2xl text-primaryText'/>
  </motion.div>
        </>
        )}
</AnimatePresence>
<br/>
</div>

<div className='flex items-center justify-center px-3 -mt-2 gap-2'>

    <p className='text-primaryText text-sm'>
        {user?.displayName ? user?.displayName:`${user?.email.split("@")[0]}`}
    </p>
<motion.p whileTap={{scale : 0.9}} className='text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer'>+ Follow 
</motion.p>

</div>

</div>

</div>

{/* SAVE BUTTON visible to user only  */}
{user && (
    <div className='flex items-center justify-center gap-4'>

    <motion.button  whileTap={{scale : 0.9}} onClick={saveProgram} className='px-6 py-2 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md'>
    Save

    </motion.button>
    
    <UserProfileDetails/>
    
</div>



)
}
 </header>
 
    <div className='w-full flex items-center justify-between px-12 py-4'>
      {/*  Horizontal split-panel* Divides page into 2 part*/}
            
          <SplitPane split='horizontal' minSize={100} maxSize={-100} defaultSize={"50%"}>
         
         {/*A) Top Coding section  */}
         <SplitPane split="vertical" minSize={33} defaultSize={"33%"} className='flex-wrap' > 
         {/* HTML Code */}
         
        <div  className='w-full h-full flex flex-col items-start justify-start'>
           <div className='w-full flex items-center justify-between'>
          <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 '>

            <FaHtml5 className='text-xl text-red-500'/>
            
            <p className='text-primaryText font-semibold'>HTML</p>
          </div>
          {/* ICONS For HTML EDITOR */}
          <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
            <FcSettings className='text-xl'/>
            <FaChevronDown className='text-xl text-primaryText'/>
          </div>
           </div>
           <div className='w-full px-2'>
           {/* HTMLEDITOR => SEE  CODE MIRROR TAG OFFICIAL  DOCUMENTATION  what On chnge event takes - values and view update */}

           <CodeMirror
      value={html} // What  value we see on UI in ediot .we  pick value from state  
      height="600px"
      extensions={[javascript({ jsx: true })]}
      theme={"dark"}
      onChange={(value, viewUpdate)=>{
        sethtml(value);
        // so every time i write anthing in ediotor sethtml will colect the 
        // value and update the state  so we have value in state and on Ui also
      }}
    />


           </div>
        </div>
         
         <SplitPane split="vertical" minSize={33} defaultSize={"33%"}>
           {/* CSS Code  */}
           <div  className='w-full h-full flex flex-col items-start justify-start'>
           <div className='w-full flex items-center justify-between'>
          <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 '>

            <FaCss3 className='text-xl text-sky-500'/>
            
            <p className='text-primaryText font-semibold'>CSS</p>
          </div>
          {/* ICONS For CSS EDITOR */}
          <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
            <FcSettings className='text-xl'/>
            <FaChevronDown className='text-xl text-primaryText'/>
          </div>
           </div>
           <div className='w-full px-2'>
           {/* CSS EDITOR => SEE  CODE MIRROR TAG OFFICIAL  DOCUMENTATION  what On chnge event takes - values and view update */}

           <CodeMirror
      value={css} // pick value from state 
      height="600px"
      extensions={[javascript({ jsx: true })]}
      theme={"dark"}
      onChange={(value, viewUpdate)=>{
        setcss(value);
      }}
    />


           </div>
        </div>


           {/* /JS code */}

           <div  className='w-full h-full flex flex-col items-start justify-start'>
           <div className='w-full flex items-center justify-between'>
          <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500 '>

            <FaJs className='text-xl text-yellow-500'/>
            
            <p className='text-primaryText font-semibold'>JS</p>
          </div>
          {/* ICONS For JS EDITOR */}
          <div className='cursor-pointer flex items-center justify-center gap-5 px-4'>
            <FcSettings className='text-xl'/>
            <FaChevronDown className='text-xl text-primaryText'/>
          </div>
           </div>
           <div className='w-full px-2'>
           {/* HTMLEDITOR => SEE  CODE MIRROR TAG OFFICIAL  DOCUMENTATION  what On chnge event takes - values and view update */}

           <CodeMirror
      value={js}  // pick value from state 
      height="600px"
      extensions={[javascript({ jsx: true })]}
      theme={"dark"}
      onChange={(value, viewUpdate)=>{
        setjs(value);
      }}
    />


           </div>
        </div>


         </SplitPane>

         </SplitPane>
         
         
         {/* B) Bottom result section Combined output of HTML CSS AND JS   */}
         <div className='bg-white' style={{overflow:"hidden" ,height:"100%"}}>
           {/* Display output in i frame  */}
           
           <iframe title='Result' srcDoc={output} style={{border:"none", width:"100%",height:"100%"}}/>
         </div>

        </SplitPane>
     
    </div>
</div>


    </>
  )
};

export default NewProject;