import React, { useState } from "react";
import {HiChevronDoubleLeft} from "react-icons/hi2"
import {MdHome} from "react-icons/md"
import {FaSearchengin} from "react-icons/fa6"
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import  {Projects, SignUp } from "../container";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
import { SET_SEARCH_TERM } from "../context/actions/searchAction";
import { Logo } from "../assets";

const Home = () => {
  // using useState snippet for (Home-Left container motion) So Set value false initially
  //so that we can create motion effect by getting value of isSideMenu and apply css and JS onClick for motion
  const [isSideMenu, setisSideMenu] = useState(false);
  const [isLogin, setisLogin] = useState(false)
 // getting state object from redux store 
  const user = useSelector(state =>state.user?.user);

// serach term 
const searchTerm = useSelector((state) => state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm :  "");

const dispatch = useDispatch()

  ///home nav must not  diplay in (Home-Left container) for non authticatrd users(user null) , visible only for user object 


  return (
    <>
 
<div onClick={()=> setisSideMenu(!isSideMenu)} className={`w-2 ${isSideMenu ? "w-2" : "flex-[.2] xl:flex-[.2]"} min-h-screen max-h-screen relative bg-secondary px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out`}>
{/* ***********************START(Home-Left container)*************************** */}
{/* so if the side menu is true, its width = w-2, else it will be flex-[.2] xl:flex-[.2]........ */}
{/* 1 ) Home page => Left container  and has this features */}
{/* --anchor */}
{/* --logo */}
{/* --start coding option */}
{/* --home nav */}



<motion.div whileTap={{scale: 0.9}} className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer">
{/* *--------------Anchor=> Using react icon + anmimation by Framer Motion -----------------* */}
<HiChevronDoubleLeft className="text-white text-xl"/>  
</motion.div>




<div className="overflow-hidden w-full flex flex-col gap-4">
{/* -------logo------------ */}
{/* as we click logo it must take user to /home so use Link of react-router-dom*/}
<Link to={"/home"}>
{/* <svg viewBox="0 0 138 26" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" title="CodePen"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6" className="object-contain w-72 h-auto"></path></svg> */}
<img className='w-32 h-auto object-contain' src={Logo}/>

</Link>



{/* --start coding option */}

{(user !=null) ? (
  <Link to={"/newProject"}>
    <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
      <p className="text-gray-400 group-hover:text-gray-200 capitalize">
        Start coding
      </p>
    </div>
  </Link>
) : (
  // Render something when isLogin is true
  <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
      <p className="text-gray-400 group-hover:text-gray-200 capitalize">
        Welcome to Code Rep !
      </p>
    </div>
)}


{/* --home nav */}
{/* Only visible to  valid user  */}
{user && (
<Link to={"/home/projects"} className="flex items-center justify-center gap-6">
<MdHome className="text-primaryText text-xl"/>
<p className="text-lg text-primaryText"> Home</p>
</Link>
)}

</div>
</div>
{/* ***********************END *****(Home-Left container)*************************** */}
 




{/* ***********************START *****(Home page => Right container)*************************** */}
<div className="flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12">
 {/*  2 ) Home page =>  Right container has this features  */}
 {/*---- Top section has => ***search***/ /***profile section***/}
{/*----- Bottom Section has => */}







<div className="w-full flex items-center justify-between gap-3">
{/* Home page => Right container => Top section  STARTS*/}



<div className="bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3">
  {/* search bar(Top section)*/}
<FaSearchengin className="text-2x text-primaryText"/>

<input type="text" value={searchTerm}  onChange={(e) => dispatch(SET_SEARCH_TERM(e.target.value))} className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder=:text-gray-600" placeholder="Search here .."/>
</div>

{/* profile section(Top section) */}
{/* Case 1 when we  dont have user object then go to signup page */}



{/* Case 2 when we have user object then to display "UserProfileDetails.jsx" */}
{/*  user object is fetched from redux store  */}
{user && <UserProfileDetails/>
}

</div>
{/* Home page => Right container => Top section  ENDS*/}


{/* Home page => Right container => Bottom  section Starts*/}
<div className="w-full">

{/* Since here we are already inside /home route 
So after /home anything comes we will display projects 
also after /home if auth comes(lets say home/auth ) then we will display Signup  */}
  <Routes>
    <Route path="/*" element={<Projects/>} />
    <Route path="/auth" element={<SignUp/>} />
  </Routes>
</div>


</div>
  </>
 
  );   
  
};

export default Home;