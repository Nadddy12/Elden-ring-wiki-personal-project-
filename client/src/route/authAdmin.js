import {Navigate} from "react-router-dom";
import {useState} from "react";
import {useSelector} from "react-redux";

export const Adminmiddleware = (props) => {
    
    const {user} = useSelector(state => state);
    const [error , setError] = useState(null);
    
    try{
        if (!localStorage.getItem("jwt")) {
            return (
                <Navigate to={"/login"}/>
            );
        }
        if (user.role !== "admin") {
            return (
                <Navigate to={"/"}/>
            )
        }
        return (
            <>
                {props.children}
            </>
        );
    }catch(err){
        setError(err.message);
        return (
            <>
                <h1>Error</h1>
                <p>{error}</p>
            </>
        )
    }
};