import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Dashboard = () => {
    const {user} = useSelector(state => state)
    return (
        <main>
            <p>welcome back <strong>{user.username}</strong> to our wiki</p>
            <br/>
            <Link to={"/"}>Home page</Link>
        </main>
    )
};