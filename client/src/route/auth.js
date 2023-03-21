import {Navigate} from "react-router-dom";
import {useState} from "react";

export const Usermiddleware = (props) => {
    const [error , setError] = useState(null)
    
    try{
        if (!localStorage.getItem("jwt")) {
            return (
                <Navigate to={"/login"}/>
            );
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