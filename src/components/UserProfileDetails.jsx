import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {AnimatePresence, motion} from "framer-motion";
import { FaChevronDown } from 'react-icons/fa6';
import { Menus, signOutAction } from '../utils/helper';
import { Link } from 'react-router-dom';
import { MdOutlineMenuOpen } from 'react-icons/md';
import { slideUpOut } from '../animation';

// When user succesfully logs in this page is displayed 
const UserProfileDetails = () => {    
 // getting state object from redux store 
  const user = useSelector(state =>state.user?.user);
  
  // monotor the statse of menu clicked  near user picture
  const [isMenu, setisMenu] = useState(false)
  

  return (
    <div className="flex items-center py-2 justify-center gap-4 relative">
    <div className="w-14 h-11  flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500">
      {
        //{/* user?.photoURL?<> IF USER HAS PHOTO url  DO THIS </> :<>IF USER DONT HAVE PHOTO URL DO THIS </> */}
        user?.photoURL ? (<> 
        <motion.img whileHover={{scale : 1.2}} src={user?.photoURL} alt={user?.displayName} referrerPolicy="no-referrer" className='w-full h-full object-cover'/> </>) :( 
        <p className='text-xl text-white font-semibold capitalize'>
            {user?.email[0]}  
            {/* If user dont have photo url then display Email ID first letter  */}
        </p>
        )
    
      }
</div>

{/* Button at side of image */}
<motion.div onClick={() => setisMenu(!isMenu)} whileTap={{ scale: 0.9}} className='p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer'>
<FaChevronDown className='text-primaryText'/>
</motion.div>


{/* Rendering the Menu using uuid See Helper.js  */}
<AnimatePresence>
    {isMenu && (
        <motion.div {...slideUpOut} className='bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]'>
{/* getting menus and link to to redirect user and pass key to monitor every menu uniquely  */}
{Menus && Menus.map(menu => (
<Link to={menu.uri}  className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md' key={menu.id}>
    {menu.name}
</Link>
))}

<motion.p onClick={signOutAction} whileTap={{scale: 0.9}} className='text-primaryText text-lg hover:bg-[rgba(256,256,256,0.05)] px-2 py-1 w-full rounded-md cursor-pointer'>
Sign Out
</motion.p>

</motion.div>

    ) }
</AnimatePresence>


</div>
  );
  
};

export default UserProfileDetails;