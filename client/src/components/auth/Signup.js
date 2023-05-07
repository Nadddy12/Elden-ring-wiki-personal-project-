import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { addUser } from "../../store/slices/user/userSlice.js";

export const Signup = () => {
    
    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [error , setError] = useState(null);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            let user = {username , email , password};
                const res = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method:"post",
                body:JSON.stringify(user),
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
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };
    
    return(
        <main className="auth-form">
            <Link to={"/"}>Home Page</Link>
            <form>
                <fieldset>
                    <legend>Join us in the journy of The Land Between</legend>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <label>Username</label>
                    <input type="Username" name="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <label>Email</label>
                    <input type="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <label>Password</label>
                    <input type="Password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <button onClick={handleRegister}>Sign in</button>
                </fieldset>
            </form>
        </main>
    );
};