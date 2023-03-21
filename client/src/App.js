import { Routes , Route , useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Home } from "./pages/home/Home.js";
import { Blog } from "./pages/blog/Blog.js";
import { OneBlog } from "./pages/blog/OneBlog.js";
import { Signup } from "./components/auth/Signup.js";
import { Login } from "./components/auth/Login.js";
import { Logout } from "./components/auth/Logout.js";
import { Dashboard } from "./pages/dashboard/Dashboard.js";
import { addUser } from "./store/slices/user/userSlice.js";
import { Usermiddleware } from "./route/auth.js";

const App = () => {
  
  const {user} = useSelector(state => state);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    
    const token = localStorage.getItem("jwt");
    
    if(token){
      fetch("http://abdulrahmanfakhri.ide.3wa.io:9602/verify-token", { 
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res=> res.json())
        .then(data => {
          dispatch(addUser(data));
        })
        .catch(err=>{
          console.log(err);
          localStorage.removeItem('jwt')
          navigate("/login");
        });
    }
    
  },[]);
  
  useEffect(()=>{
    console.log(user);
  },[user]);
  
  return (
      <Routes>
        
        <Route path="/" element= {<Home/>} />
        <Route path="/signup" element= {<Signup/>} />
        <Route path="/login" element= {<Login/>} />
        <Route path="/logout" element= {<Logout/>} />
        <Route path="/blog" element= {<Blog />} />
        <Route path="/article/:id" element= {<OneBlog/>} />
        
        
        <Route path="/dashboard" element= {<Usermiddleware> <Dashboard/> </Usermiddleware>} />
        
      </Routes>
  );
};

export default App;
