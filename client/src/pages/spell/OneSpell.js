import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const OneSpell = () =>{
    const [spell , setSpell] = useState({});
    const [error, setError] = useState(null);
    const {id} = useParams();
    
    const URL = `/spell-by-id/${id}`;
    
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL);
                setSpell(res);
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
        <div className="spellContainer">
            <h2 className="spell-name">{spell.name}</h2>
            <p className="spell-type"> Type : {spell.type}</p>
            <p className="spell-damage"> Damage : {spell.damage}</p>
            <div className="spell-damagetype"> Damage Type : {spell.damagetype}</div>
        </div>
        {spell.image &&
        <div className="spell-image">
            <img src={`http://abdulrahmanfakhri.ide.3wa.io:9602/${spell.image}`} alt={spell.name}/>
        </div>
        }
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