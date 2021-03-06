import React,{createContext,useState,useEffect} from 'react';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
// import NotFound from './components/NotFound.jsx';
import SignUp from './components/SignUp.jsx';
import Editform from './components/Editform.jsx';

export const AuthProvider=createContext();

const App = () => {

  const [auth, setAuth] = useState(false);
  const handleAuth = () => {
    setAuth(!auth);
  };

  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
     setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
  },[auth])

  const myAuth = [auth, handleAuth];
  
  return (
    <>
      <BrowserRouter>
      <AuthProvider.Provider value={myAuth}>
       <Routes>
         <Route exact path='/' element={<Login/>} />
         <Route exact path='/signup' element={<SignUp/>} />
         {isLogin && <Route exact path='/home' element={<Home/>} /> }
         {isLogin && <Route exact path="/editform" element={<Editform/>}/>}
         <Route path="*" element={<Login/>} />
       </Routes>
       </AuthProvider.Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
