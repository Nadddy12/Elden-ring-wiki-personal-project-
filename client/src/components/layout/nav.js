import { Link } from "react-router-dom";

export const Nav = () => {
    return(
        <nav>
            <Link className="nav-links" to={"/"}>Home Page</Link>
            <Link className="nav-links" to={"/blog"}>Blogs</Link>
            <Link className="nav-links" to={"/guide"}>Guides</Link>
            <Link className="nav-links" to={"/equipment"}>Equipments</Link>
            <Link className="nav-links" to={"/spell"}>Spells</Link>
        </nav>
    );
};