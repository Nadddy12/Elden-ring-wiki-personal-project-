import { Routes , Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { PublicRoutes , UserRoutes , AdminRoutes , ModRoutes } from "./route/routes.js";
import { addUser } from "./store/slices/user/userSlice.js";
import { Usermiddleware } from "./route/auth.js";
import { Adminmiddleware } from "./route/authAdmin.js";
import { Modmiddleware } from "./route/authMod.js";

const App = () => {
  
  const {user} = useSelector(state => state);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    const token = localStorage.getItem("jwt");
    
    if(token && !user.isLogged) {
      fetch(`${process.env.REACT_APP_API_URL}/verify-token`, { 
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
        });
    }
    
  },[]);
  
  return (
    <Routes>
    
      {PublicRoutes.map((route, i) => (
                  <Route path={route.path} element={route.element} key={i} exact={true}/>
              ))}
              
      {UserRoutes.map((route, i) => (
                  <Route path={route.path} element={<Usermiddleware> {route.element} </Usermiddleware>} key={i} exact={true}/>
              ))}
              
      {ModRoutes.map((route, i) => (
                  <Route path={route.path} element={<Modmiddleware> {route.element} </Modmiddleware>} key={i} exact={true}/>
              ))}
              
      {AdminRoutes.map((route, i) => (
                  <Route path={route.path} element={<Adminmiddleware> {route.element}</Adminmiddleware>} key={i} exact={true}/>
              ))}
    
    </Routes>
  );
};

export default App;
