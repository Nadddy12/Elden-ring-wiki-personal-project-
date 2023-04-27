import { Link } from "react-router-dom";
import "./style/nav.scss";

export const Nav = () => {
    return(
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/blog"}>Blogs</Link>
            <Link to={"/guide"}>Guides</Link>
            <Link to={"/equipment"}>Equipments</Link>
            <Link to={"/spell"}>Spells</Link>
        </nav>
    );
};