import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeUser } from "../../store/slices/user/userSlice.js";

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        localStorage.removeItem("jwt");
        dispatch(removeUser());
        navigate("/");
    },[navigate]);
};