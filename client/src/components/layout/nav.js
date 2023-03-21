import { Link } from "react-router-dom";

export const Nav = () => {
    return(
        <nav>
            <Link className="nav-links" to={"/"}>Home Page</Link>
            <Link className="nav-links" to={"/blog"}>Blogs</Link>
        </nav>
    );
};