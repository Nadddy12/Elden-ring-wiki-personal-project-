import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchPostForm , FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Builder = () => {
    
    const {user} = useSelector(state => state);
    
    const [name , setName] = useState("");
    const [level , setLevel] = useState(10);
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
    const [error , setError] = useState(null);
    const [dataSpell , setDataSpell] = useState([]);
    const [dataEquipment , setDataEquipment] = useState([]);
    
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
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setAttribute({...attribute , [name]: value});
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            const data = (name , level , {attribute} , equipment , spell);
            const URL = `/user/character`;
            const res = FetchPostForm(URL , data);
            console.log(res);
        }catch(err) {
            setError(err.message);
        }
    };
    
    const content = error ? (
        <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
        <main>
            <section>
            <h2>Use our powerful tools to simulate you build</h2>
                <div className="builder-wrapper">
                    <form>
                        <fieldset>
                            <legend>Create Your Character</legend>
                            <input type="text" name="name" placeholder="Enter build name" onChange={handleNameInput} value={name} />
                            <input type="number" name="level" placeholder={level} onChange={handleLevelInput} value={level}/>
                            {Object.entries(attribute).map(([name , value], i) => (
                                <input type="number" key={i} className="attribute" name={name} placeholder={value} onChange={handleChange} value={value}/>
                            ))}
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
                            <button onClick={handleSubmit}>Save</button>
                        </fieldset>
                    </form>
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



            /*const dataAtt = new FormData();
            
                dataAtt.append("vigor", form.vigor);
                dataAtt.append("mind", form.mind);
                dataAtt.append("endurance", form.endurance);
                dataAtt.append("strength", form.strength);
                dataAtt.append("dexterity", form.dexterity);
                dataAtt.append("intelligence", form.intelligence);
                dataAtt.append("faith", form.faith);
                dataAtt.append("arcane", form.arcane);
                */
                
                
                /*<input type="number" className="attribute" name="vigor" placeholder={attribute.vigor} onChange={handleChange} value={attribute.vigor}/>
                            <input type="number" className="attribute" name="mind" placeholder={attribute.mind} onChange={handleChange} value={attribute.mind}/>
                            <input type="number" className="attribute" name="endurance" placeholder={attribute.endurance} onChange={handleChange} value={attribute.endurance}/>
                            <input type="number" className="attribute" name="strength" placeholder={attribute.strength} onChange={handleChange} value={attribute.strength}/>
                            <input type="number" className="attribute" name="dexterity" placeholder={attribute.dexterity} onChange={handleChange} value={attribute.dexterity}/>
                            <input type="number" className="attribute" name="intelligence" placeholder={attribute.intelligence} onChange={handleChange} value={attribute.intelligence}/>
                            <input type="number" className="attribute" name="faith" placeholder={attribute.faith} onChange={handleChange} value={attribute.faith}/>
                            <input type="number" className="attribute" name="arcane" placeholder={attribute.arcane} onChange={handleChange} value={attribute.arcane}/>*/