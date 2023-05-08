import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchPost , FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Helmet } from "react-helmet";
import "./style/builder.scss";

export const Builder = () => {
    
    const {user} = useSelector(state => state);
    const navigate = useNavigate();
    
    //input state
    const [name , setName] = useState("");
    const [level , setLevel] = useState(1);
    const [attribute , setAttribute] = useState({
        vigor:10,
        mind:10,
        endurance:10,
        strength:10,
        dexterity:10,
        intelligence:10,
        faith:10,
        arcane:10
    });
    const [equipment , setEquipment] = useState("");
    const [spell , setSpell] = useState("");
    const [dataSpell , setDataSpell] = useState([]);
    const [dataEquipment , setDataEquipment] = useState([]);
    
    //output state
    const [health , setHealth] = useState(425);
    const [stamina , setStamina] = useState(70);
    const [focus , setFocus] = useState(60);
    const [damageEquipment , setDamageEquipment] = useState(0);
    const [damageSpell , setDamageSpell] = useState(0);
    
    //handle errors
    const [error , setError] = useState(null);
    const [errorSubmit , setErrorSubmit] = useState(null);
    
    
    //calling spell to loop it as value
    useEffect(() => {
        const fetchDataSpell = async () =>{
            try{
                const URL = `/spell`;
                const res = await FetchGet(URL);
                setDataSpell(res);
            }catch(err){
                setError(err.message);
            }
        };
        fetchDataSpell();
    }, []);
    
    //calling equipment to loop it as values
    useEffect(() => {
        const fetchDataEquipment = async () =>{
            try{
                const URL = `/equipment`
                const res = await FetchGet(URL);
                setDataEquipment(res);
            }catch(err){
                setError(err.message);
            }
        };
        fetchDataEquipment();
    }, []);
    
    //handle the changes in form and the output
    const handleChange = (e) => {
        const {name , value} = e.target;
        const allowedValue = Math.min(value, 99)
        
        const oldValue = attribute[name];
        const attributeDiff = allowedValue - oldValue;
        
        setAttribute({...attribute , [name]: allowedValue});
        setLevel((prevLevel) => prevLevel + attributeDiff * 1)
        
        if(name === "vigor") {
            setHealth((prevHealth) => prevHealth + attributeDiff * 30 )
        } else if (name === "endurance") {
            setStamina((prevStamina) => prevStamina + attributeDiff * 2)
        } else if (name === "mind") {
            setFocus((prevFocus) => prevFocus + attributeDiff * 3)
        }
    };
    
    const handleNameInput = (e) => {
        setName(e.target.value.replace(/^\w/, (c) => c.toUpperCase()));
    };
    
    const handleLevelInput = (e) => {
        setLevel(e.target.value);
    };
    
    const handleEquipmentInput = (e) => {
        setEquipment(e.target.value);
    };
    
    const handleSpellInput = (e) => {
        setSpell(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorSubmit(null);
        try{
            const data = {
                name, 
                level ,
                ...attribute,
                equipment,
                spell
            };
            const URL = `/user/character`;
            await FetchPost(URL , data);
                navigate("/character")
        }catch(err) {
            setErrorSubmit(err.message);
        }
    };
    
    //output calculation 
    useEffect(() => {
        const selectedEquipment = dataEquipment.find((e) => e._id === equipment);
        const selectedSpell = dataSpell.find((e) => e._id === spell);
        
        const equipmentDamage = selectedEquipment ? selectedEquipment.damage : 0;
        const spellDamage = selectedSpell ? selectedSpell.damage : 0;
        
        const eDamage = equipmentDamage * (1 + Math.log(attribute.strength - 9) * 0.4 + Math.log(attribute.dexterity - 9) * 0.2)
        let sDamage;
        if(selectedSpell && selectedSpell.type === "Incantation") {
            sDamage = spellDamage * (1 + Math.log(attribute.intelligence - 9) * 0.07 + Math.log(attribute.faith - 9) * 0.9 + Math.log(attribute.arcane - 9) * 0.02)
        } else {
            sDamage = spellDamage * (1 + Math.log(attribute.intelligence - 9) * 0.9 + Math.log(attribute.faith - 9) * 0.07 + Math.log(attribute.arcane - 9) * 0.02)
        }
        
        setDamageEquipment(eDamage);
        setDamageSpell(sDamage);
    },[attribute , equipment , spell , dataEquipment , dataSpell]);
    
    //render part
    const content = 
    (
        <main>
            <section>
            <h2>Use our powerful tools to simulate your build</h2>
                <div className="builder-wrapper">
                    <form>
                        <fieldset>
                            <legend>Create Your Character</legend>
                            <input className="name" type="text" name="name" placeholder="Enter build name" onChange={handleNameInput} value={name} />
                            <label>Level</label>
                            <input type="number" name="level" placeholder={level} onChange={handleLevelInput} value={level} disabled/>
                            {Object.entries(attribute).map(([name , value], i) => (
                                <React.Fragment key={i}>
                                    <label>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
                                    <input type="number" className="attribute" name={name} placeholder={value} onChange={handleChange} value={value} min="10" max="99" step="1"/>
                                </React.Fragment>
                            ))}
                            {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                            <select name="spell" value={spell} onChange={handleSpellInput}>
                                <option value="">Select a spell</option>
                                {dataSpell.map((spell , i) => (
                                    <option key={i} value={spell._id}>{spell.name}</option>
                                ))}
                            </select>
                            <select name="equipment" value={equipment} onChange={handleEquipmentInput}>
                                <option value="">Select a Equipment</option>
                                {dataEquipment.map((equipment , i) => (
                                    <option key={i} value={equipment._id}>{equipment.name}</option>
                                ))}
                            </select>
                            {errorSubmit && <div className="errorMessage error" style={{ color: "red" }}>{errorSubmit}</div> }
                            {user.role && <button onClick={handleSubmit}>Save</button>}
                        </fieldset>
                    </form>
                </div>
                <div className="output">
                    <label>Health : </label>
                    <input type="number" name="health" value={health} disabled />
                    <label>Stamina : </label>
                    <input type="number" name="stamina" value={stamina} disabled />
                    <label>Focus : </label>
                    <input type="number" name="focus" value={focus} disabled />
                    <label>Spell Damage : </label>
                    <input type="number" name="spellDamage" value={Math.round(damageSpell)} disabled />
                    <label>Weapon Damage : </label>
                    <input type="number" name="equipmentDamage" value={Math.round(damageEquipment)} disabled />
                </div>
            </section>
        </main>
    );
    
    return (
        <>
        <Helmet>
                <title>Elden Ring wiki Fansite - Builder</title>
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