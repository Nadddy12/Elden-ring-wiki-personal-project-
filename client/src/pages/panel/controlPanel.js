import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { Helmet } from "react-helmet";
import "./style/controlPanel.scss"

export const ControlPanel = () => {
    
    const {user} = useSelector(state => state);
    
    const content = user.role === 'admin' ? (
            <main>
                <section>
                    <h2>ControlPanel</h2>
                    <div className="admin-linksContainer">
                        <Link className="admin-links" to={"/users"}>Users</Link>
                        <Link className="admin-links" to={"/create-blog"}>Create new Blog</Link>
                        <Link className="admin-links" to={"/create-guide"}>Create new Guide</Link>
                        <Link className="admin-links" to={"/create-equipment"}>Create new Equipment</Link>
                        <Link className="admin-links" to={"/create-spell"}>Create new Spell</Link>
                    </div>
                </section>
            </main>
        ) : (
            <main>
                <section>
                    <h2>ControlPanel</h2>
                    <div className="admin-linksContainer">
                        <Link className="admin-links" to={"/create-blog"}>Create new Blog</Link>
                    </div>
                </section>
            </main>
            )
    return(
        <>
            <Helmet>
                <title>Control Panel</title>
            </Helmet>
            <Header />
            {content}
            <Footer />
        </>
    );
};