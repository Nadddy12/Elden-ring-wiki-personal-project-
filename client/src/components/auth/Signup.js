import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { useState } from "react";
import { addUser } from "../../store/slices/user/userSlice.js"

export const Signup = () => {
    
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [error , setError] = useState(null)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const handleRegister = async (e) =>{
        e.preventDefault()
        try{
            let user = {username , email , password}
                const res = await fetch("http://abdulrahmanfakhri.ide.3wa.io:9602/signup", {
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
            navigate("/dashboard");
        }catch(err){
            console.log(err)
        }
    };
    
    return(
        <>
            <Link to={"/"}>Home Page</Link>
            <form>
                {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                <label>username</label>
                <input type="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                <label>email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <label>password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button onClick={handleRegister}>Sign in</button>
            </form>
        </>
    )
};