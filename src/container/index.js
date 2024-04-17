// we will use this to export all the containers from single place 

export {default as Home} from "./Home" ;
export {default as SignUp} from "./SignUp"
export {default as Projects} from "./Projects"
export {default as NewProject} from "./NewProject"
// so by this we can abvoid muiltiple import statement  in header 
//and can import all in one go in APP.jsx
//So instead of this => 
//import { Home } from './container/Home'
//import { Login } from './container/Login'
//import { Footer } from './container/Footer'

//we will use this now to import themas objects  in signle stemenet 
//import { Home,Login,Footer } from './container'