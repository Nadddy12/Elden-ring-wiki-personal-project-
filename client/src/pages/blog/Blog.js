import { Header } from "../../components/layout/Header.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Blog = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch("http://abdulrahmanfakhri.ide.3wa.io:9602/blog", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });
        if (!res.ok) {
            const error = await res.json();
            setError(error.message);
            return;
        }
        const data = await res.json();
        setData(data);
        } catch (err) {
        console.log(err);
        }
        };
    fetchData();
    }, []);
    

const content = error ? (
    <div>{error}</div>
    ) : (
    <main>
        <div className="blogListContainer">
            {data.map((ele, i) => (
                <Link to={"/article/" + ele._id} className="blogList" key={i}>{ele.title}</Link>
            ))}
        </div>
    </main>
    );

    return (
        <>
            <Header />
            {content}
        </>
    );
};