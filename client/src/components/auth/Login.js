import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { addUser } from "../../store/slices/user/userSlice.js";
import "./style/style.scss";

export const Login = () => {
    
    
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState(null)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const handleLogin = async (e) =>{
        
        e.preventDefault();
        try{
            const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method:"post",
                body:JSON.stringify({email , password}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(!res.ok){
                const error = await res.json();
                setError(error.message);
                return;
            }
            const data = await res.json();
            dispatch(addUser(data));
            localStorage.setItem("jwt", data.jwt);
            navigate("/dashboard");
        }catch(err){
            console.log(err);
        }
    };
    
    
    return(
        <main className="auth-form">
            <Link to={"/"}>Home Page</Link>
            <form>
                <fieldset>
                    <legend>Welcome back Tarnished</legend>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <label>Email</label>
                    <input forhtml="Email" type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <label>Password</label>
                    <input forhtml="Password" type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <button onClick={handleLogin}>Login</button>
                </fieldset>
            </form>
        </main>
    );
};