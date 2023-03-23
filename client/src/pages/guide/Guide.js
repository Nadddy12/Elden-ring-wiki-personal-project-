import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";

export const Guide = (props) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
    const URL = "/guide"
    
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL)
                console.log(res)
                setData(res);
                console.log(res)
            }catch(err){
                setError(err.message)
            }
        };
        fetchData();
    }, []);
    
    
const content = error ? (
    <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
    <main>
        <div className="guideListContainer">
            {data.map((ele, i) => (
                <div key={i} className="youtube-video">
                    <h3 className="guide-title" key={i}>{ele.title}</h3>
                    
                    <div className="youtube-link">
                        <iframe
                        width="600"
                        height="480"
                        src={ele.link}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`Guide ${ele.title}`}
                        />
                    </div>
                    
                    <p className="guide-content">{ele.content}</p>
                </div>
            ))}
        </div>
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