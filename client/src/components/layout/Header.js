import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "./nav.js"

export const Header = () => {
    const {user} = useSelector(state => state);
    
    const commonContent = (
        <header>
            <h1>ELDEN RING WIKI</h1>
                <div className="userInterface">
                    <h2>Welcome back <span className="username-header">{user.username.toUpperCase()}</span> Tarnished</h2>
                    <br/>
                    <Link className="header-links" to={"/logout"}>Log out</Link>
                </div>
                <Nav />
            </header>
    );
    switch(user.role){
        case "user": 
            return commonContent;
        case "mod":
            return (
                <>
                    {commonContent}
                    <p>Mod</p>
                </>
            );
        case "admin":
            return (
                <>
                    {commonContent}
                    <p>Admin</p>
                </>
            );
        
        default: 
        return (
            <header>
                <h1 className="main-title">ELDEN RING WIKI</h1>
                    <div className="userInterface">
                        <p><strong>To start</strong></p>
                        <Link className="header-links" to={"/signup"}>Sign up</Link>
                        <br/>
                        <Link className="header-links" to={"/login"}>Log in</Link>
                    </div>
                    <Nav />
            </header>
        );
    }
};