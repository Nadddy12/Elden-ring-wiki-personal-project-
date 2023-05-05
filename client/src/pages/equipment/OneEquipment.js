import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style/oneequipment.scss";


export const OneEquipment = () =>{
    const [equipment , setEquipment] = useState({});
    const [error, setError] = useState(null);
    const {id} = useParams();
    
    const URL = `/equipment-by-id/${id}`
    
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL)
                setEquipment(res);
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
        <section>
            <div className="wrapper-detail">
                <div className="equipment-container">
                    <h2 className="equipment-name">{equipment.name}</h2>
                    <p className="equipment-type"> Type : {equipment.type}</p>
                    <p className="equipment-damage"> Damage : {equipment.damage}</p>
                    <div className="equipment-damagetype"> 
                        {equipment.damagetype ? (
                                equipment.damagetype.map((e, i) => (
                                    <p className="equipment-damagetype" key={i}>
                                        Damage Type: {e}
                                    </p>
                                ))) : (
                                <p>No damage types available.</p>
                        )}
                    </div>
                    <div className="equipment-infusion"> 
                        {equipment.infusion ? (
                            <p> Infusion : yes</p>
                        ) : (
                            <p> Infusion : No</p>
                        )}
                    </div>
                </div>
                { equipment.image &&
                <div className="equipment-image">
                    <img src={`${process.env.REACT_APP_API_URL}/${equipment.image}`} alt={equipment.name}/>
                </div>
                }
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