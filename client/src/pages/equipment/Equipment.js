import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Equipment = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
    const URL = `/equipment`;
    
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
        <div className="equipmentListContainer">
            {data.map((ele, i) => (
            <div key={i} className="equipments">
                <Link to={"/equipment/" + ele._id} className="equipments-name" >{ele.name}</Link>
                <img src={`http://abdulrahmanfakhri.ide.3wa.io:9602/${ele.image[0]}`} alt={ele.name}/>
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