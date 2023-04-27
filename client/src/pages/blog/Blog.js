import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style/blog.scss";

export const Blog = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
    const URL = "/blog"

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL);
                setData(res);
            }catch(err){
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    

const content = error ? (
    <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
    <main>
        <section>
            <div className="blogListContainer">
                {data.map((ele, i) => (
                    <div key={i} className="blogs">
                        <Link to={"/article/" + ele._id} className="blogs-name">{ele.title}</Link>
                        {ele.user?.username && <h4 className="blogs-publisher">Published by : {ele.user.username}</h4>}
                        <p className="blogs-bref-view">{ele.content.split(" ").slice(0,30).join(" ")}...</p>
                        <hr className="line-cutter"/>
                    </div>
                ))}
            </div>
        </section>
    </main>
    );

    return (
        <>
            <Header />
            {content}
            <Footer />
        </>
    );
};

            /*.then((res) => {
                setData(res);
                console.log(res)
            })
            .catch((err) => {
                 setError(err.message)
            })*/