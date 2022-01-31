import { async } from '@firebase/util';
import { useRef, useState } from 'react';
import './App.css';
import { signUp , useAuth , logOut , login } from "./Firebase"
import Profile from './Profile';

function App() {


  const [loading , setLoading] = useState(false)

  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  

  //onclick on the signup button it evokes the functionality of the signup feature
  async function handleSignup() {
    setLoading(true)
    try{
      await signUp(emailRef.current.value , passwordRef.current.value)
    }catch{
      alert("email already in use")
    }
    setLoading(false)
  }


  //onclick of the login button it evokes the functionality of the login feature 
  async function handleLogin(){
    setLoading(true)
    try{
      await login(emailRef.current.value , passwordRef.current.value)
    }catch{
      alert("error in login")
    }
    setLoading(false)
  }


  //onclick of the logout button it evokes the functionality of the logout feature
  async function handleLogout(){
    setLoading(true)
    try{
      await logOut();
    }catch {
      alert("error in logout");
    }  
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>firebase authentiacation with email & password</h1>

      <div>Logged in as : { currentUser?.email } </div>

      {!currentUser &&
        <>
            <input placeholder = "email" ref={emailRef}/>
            <input type="password" placeholder="password" ref={passwordRef}/> <br></br>
            <button disabled={loading || currentUser != null} onClick={handleSignup}>Signup</button>
            <button disabled={loading || currentUser != null} onClick={handleLogin}>Log In</button>
        </>
      }
      
      

      {currentUser &&
          <>
            <button disabled={loading || !currentUser} onClick={handleLogout}>Log out</button>
            <Profile />
          </> 
      }
    </div>

    
  );
}

export default App;
