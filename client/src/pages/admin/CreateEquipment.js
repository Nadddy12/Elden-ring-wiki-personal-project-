import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FetchPostForm } from "../../helper/fetch.js";
import { Header } from "../../components/layout/Header.js"
import { Footer } from "../../components/layout/Footer.js"
import "./style/style.scss";


export const CreateEquipment  = () => {
    
    const [form , setForm] = useState({
        name: "",
        damagetype:[],
        damage:0,
        infusion:false,
        type:"",
        image: null,
    });
    const [error , setError] = useState(null);
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        if(name === "damagetype"){
            const valuesArray = value.split(",");
            setForm({ ...form , [name]: valuesArray });
        }else {
            setForm({ ...form , [name]: value });
        }
    };
    
    const handleflieChange = (e) => {
        setForm({ ...form , image: e.target.files[0]});
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const data = new FormData();
            data.append("name", form.name);
            data.append("type", form.type);
            data.append("damagetype", form.damagetype.join(","));
            data.append("damage", form.damage);
            data.append("infusion", form.infusion);
            data.append("image", form.image);
            
            const URL = `/admin/add-equipment`
            const res = await FetchPostForm(URL , data )
            navigate(`/control-panel`);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    
    return(
        <>
        <Header />
        <main className="admin-form">
            <form>
                <fieldset>
                    <legend>Create Equipment</legend>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <label>Name</label>
                    <input htmlFor="Name" type="text" name="name" onChange={handleChange} value={form.name} />
                    <label>Damage-Type  ( Seperate the type by using  ","  without space )</label>
                    <input htmlFor="Damage-Type" type="text" name="damagetype" onChange={handleChange} value={form.damagetype.join(",")} />
                    <label>Damage</label>
                    <input htmlFor="Damage" type="number" name="damage" onChange={handleChange} value={form.damage} />
                    <label>Infusion
                    <input htmlFor="Infusion" type="checkbox" name="infusion" onChange={handleChange} value={form.infusion} />
                    </label>
                    <label>Type
                    <select htmlFor="Type" name="type" onChange={handleChange} value={form.type}>
                        <option value="none">Select an Option</option>
                        <option value="Daggers">Daggers</option>
                        <option value="Straight Swords">Straight Swords</option>
                        <option value="Greatswords">Greatswords</option>
                        <option value="Colossal Swords">Colossal Swords</option>
                        <option value="Thrusting Swords">Thrusting Swords</option>
                        <option value="Heavy Thrusting Swords">Heavy Thrusting Swords</option>
                        <option value="Curved Swords">Curved Swords</option>
                        <option value="Curved Greatswords">Curved Greatswords</option>
                        <option value="Katanas">Katanas</option>
                        <option value="Twinblades">Twinblades</option>
                        <option value="Axes">Axes</option>
                        <option value="Greataxes">Greataxes</option>
                        <option value="Hammers">Hammers</option>
                        <option value="Flails">Flails</option>
                        <option value="Great Hammers">Great Hammers</option>
                        <option value="Colossal Weapons">Colossal Weapons</option>
                        <option value="Spears">Spears</option>
                        <option value="Great Spears">Great Spears</option>
                        <option value="Halberds">Halberds</option>
                        <option value="Reapers">Reapers</option>
                        <option value="Whips">Whips</option>
                        <option value="Fists">Fists</option>
                        <option value="Claws">Claws</option>
                    </select>
                    </label>
                    <label>Image</label>
                    <input htmlFor="Image" type="file" name="image" accept="image/*" onChange={handleflieChange} />
                    <button onClick={handleSubmit}>Add</button>
                </fieldset>
            </form>
        </main>
        <Footer />
        </>
    );
};