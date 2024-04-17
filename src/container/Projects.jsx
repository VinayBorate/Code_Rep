import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import {motion} from "framer-motion"
import { MdBookmark } from 'react-icons/md';
import { Link } from 'react-router-dom';


// to display the project section of particluar user 
//we need to cratea a action and a  reducer to monitore projects
// so first bring  projects 
// fOR => setting up action  --> go to context folder -> make new file -> ProjectsActions.js
// fOR => setting up reducer go to reducer foldre >  make a new file -> ProjectReducer.js
// update index .js in reducer.


const Projects = () => {

  // Filter Search 
  const [filter, setfilter] = useState(null) 

 ///Fetching Project state data from Redux store 
 const projects = useSelector((state) => state.project?.projects); // i have my Project data in => project.projects
 
 const [isLogin, setisLogin] = useState(true) 
  useEffect(()=> {},[])
// intialy we dont have serach string 
// if we have search tearm (state.searchTerm?.searchTerm) ?  then set value as state.searchTerm?.searchTerm else empty striung  
// serach term 
const searchTerm = useSelector((state) => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : "");

//Seraching logic 
useEffect(() => {
  if(searchTerm?.length>0) {
    setfilter(
    projects?.filter((project)=> {
const lowerCaseItem = project?.tittle.toLowerCase();
return searchTerm
.split("")
.every((letter)=> lowerCaseItem.includes(letter));
// we are splliting the string into character array then use every methord to itteratr the letter in array . so if letter lies in tittle it gets filtered 
    })
)}
  else{
    setfilter(null);
  }
},[searchTerm]
);





 
return (
  <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
    {filter ? (
      filter.map((project, index) => (
        <Link to={"/newProject/edit/"+project.id}>
        <ProjectCard key={project.id} project={project} index={index} /></Link>
      ))
    ) : (
      projects &&
      projects.map((project, index) => (
       <Link to={"/newProject/edit/"+project.id}>
        <ProjectCard key={project.id} project={project} index={index} /> </Link>
      ))
    )}
  </div>
);

};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div key={index} className="w-full cursor-pointer md:w-[450px] h-[375px] bg-secondary rounded-md p-4 flex flex-col items-center justify-center gap-4">
     
     <div className='bg-primary w-full h-full rounded-md overflow-hidden' style={{overflow:"hidden" ,height:"100%"}}>
           {/* Display output in i frame  */}
           
           <iframe title='Result' srcDoc={project.output} style={{border:"none", width:"100%",height:"100%"}}/>
         </div>
          
          <div className='flex items-center justify-start gap-3 w-full'>
          
          <div className="w-14 h-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
         {
          project?.user?.photoURL ? (<> 
        <motion.img whileHover={{scale : 1.2}} src={project?.user?.photoURL} alt='' referrerPolicy="no-referrer" className='w-full h-full object-cover'/> </>) :( 
        <p className='text-xl text-white font-semibold capitalize'>
            {project?.user?.email[0]}  
            {/* If user dont have photo url then display Email ID first letter  */}
        </p>
        )

         }
</div>
          
          {/* Name on card + Project name  */}

          <div>
          <p className='text-white text-lg capitalize'>{project?.tittle}</p>
          <p className='text-primaryText text-sm capitalize'>
        {project?.user?.displayName 
        ? project?.user?.displayName : `${project?.user.email.split("@")[0]}`
        }
    </p>
          
          
           </div>

<motion.div className='cursor-pointer ml-auto' whileTap={{scale: 0.9}}>
<MdBookmark className='text-primaryText text-3xl'/>
</motion.div>


           </div>

      {/* Add more details or components to display other project information */}
    </motion.div>
  );
};


export default Projects