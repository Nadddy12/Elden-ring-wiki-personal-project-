import { Link } from "react-router-dom";
import {Header} from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";

export const ControlPanel = () => {
    return(
        <>
            <Header />
            <main>
                <h1>ControlPanel</h1>
                <div className="admin-linksContainer">
                    <Link className="admin-links" to={"/create-blog"}>Create new Blog</Link>
                </div>
            </main>
            <Footer />
        </>
    );
};