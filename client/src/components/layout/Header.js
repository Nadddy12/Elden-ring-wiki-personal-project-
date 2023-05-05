import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "./nav.js";
import { BsList } from 'react-icons/bs';
import "./style/header.scss";

export const Header = () => {
    const {user} = useSelector(state => state);
    
    const commonContent = (
        <header>
            <h1 className="main-title">ELDEN RING WIKI</h1>
            { user.role === "user" ? (
                <div className="userInterface">
                    <p>Welcome back Tarnished <span className="username-header">{user.username}</span></p>
                    <div className="menu">
                        <BsList />
                        <div className="menu-dropdown">
                            <Link className="header-links" to={"/character"}>Character</Link>
                            <Link className="header-links" to={"/logout"}>Log out</Link>
                        </div>
                    </div>
                </div>
            ) : user.role === "mod" ? (
                <div className="userInterface">
                    <p>Welcome back Tarnished <span className="username-header">{user.username}</span></p>
                    <div className="menu">
                        <BsList />
                        <div className="menu-dropdown">
                            <Link className="header-links" to={"/control-panel"}>Admin</Link>
                            <Link className="header-links" to={"/character"}>Character</Link>
                            <Link className="header-links" to={"/logout"}>Log out</Link>
                        </div>
                    </div>
                </div>
            ) : user.role === "admin" ? (
                <div className="userInterface">
                    <p>Welcome back Tarnished <span className="username-header">{user.username}</span></p>
                    <div className="menu">
                        <BsList />
                        <div className="menu-dropdown">
                            <Link className="header-links" to={"/control-panel"}>Admin</Link>
                            <Link className="header-links" to={"/character"}>Character</Link>
                            <Link className="header-links" to={"/logout"}>Log out</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="userInterface">
                    <p>Guest</p>
                    <div className="menu">
                        <BsList />
                        <div className="menu-dropdown">
                            <Link className="header-links" to={"/signup"}>Sign up</Link>
                            <Link className="header-links" to={"/login"}>Log in</Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
        return (
            <>
                {commonContent}
                <Nav />
            </>
        );
};