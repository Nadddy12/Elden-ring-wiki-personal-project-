import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { DeleteCharacter } from "../../components/character/DeleteCharacter.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./style/character.scss";

export const Characters = () => {
    
    const [data , setData] = useState([]);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const URL =`/user/get-character`;
        const fetchCharacter = async () =>{
            try{
                const res = await FetchGet(URL);
                if(res.message) {
                    setMessage(res.message);
                } else {
                    setData(res);
                }
            }catch(err){
                console.log(err);
                setError(err.message);
            }
        };
        fetchCharacter();
    },[]);
    
    
    const content = error ? (
            <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
        ) : message ? (
                <main>
                    <section>
                        <div style={{ color: "#e0ddce" , width : "100%" , fontSize: "28px" , textAlign: "center"}}>{message}</div>
                        <div className="link-builder">
                            <Link to={"/builder"} >Click here to build a character</Link>
                        </div>
                    </section>
                </main>
            ) : (
            <main>
                <section>
                    <div className="character-list">
                    <div className="link-builder">
                        <Link to={"/builder"} >Click here to build a character</Link>
                    </div>
                    <div className={`character-counter ${data.length === 5 ? "character-counter-red" : ""}`}>CHARACTERS : {data.length}/5</div>
                        {data.map((ele, i) => (
                            <div key={i} className="character">
                                {<DeleteCharacter character={ele} characterId={ele._id} 
                                    onCharacterDelete={(character)=>setData(data.filter((c) => c._id !== character._id))}/>}
                                <h4>{ele.name}</h4>
                                <p className = "level"> Level {ele.level}</p>
                                <div className="attribute">
                                    <p>Vigor : {ele.attributes.vigor}</p>
                                    <p>Mind : {ele.attributes.mind}</p>
                                    <p>Endurance : {ele.attributes.endurance}</p>
                                    <p>Strength : {ele.attributes.strength}</p>
                                    <p>Dexterity : {ele.attributes.dexterity}</p>
                                    <p>Intelligence : {ele.attributes.intelligence}</p>
                                    <p>Faith : {ele.attributes.faith}</p>
                                    <p>Arcane : {ele.attributes.arcane}</p>
                                </div>
                                <div className="weapons">
                                    <p>Equipment : {ele.equipment?.name || 'N/A'}</p>
                                    <p>Spell : {ele.spell?.name || 'N/A'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
    );
    return (
        <>
            <Helmet>
                <title>Elden Ring wiki Fansite - Characters</title>
                <meta 
                    name="description" 
                    content="Create your perfect character in Elden Ring with our user-friendly character builder tool. Experiment with different builds, stats, and equipment to find the perfect combination for your playstyle. Our community provides tips and advice to help you get the most out of your character. Join us now and start building your ultimate warrior."
                />
                <meta name="keywords" content="blogs, elden, eldenring, elden ring, game, fromsoftware, multiplayer, community, tool, character, builder" />
            </Helmet>
            <Header />
            {content}
            <Footer />
        </>
    );
};