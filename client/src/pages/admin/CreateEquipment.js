import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { FetchPostForm } from "../../../helper/fetch.js";

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
    
    const token = localStorage.getItem("jwt");
    
    // const URL = (`/admin/add-equipment`);
    
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
            
            
        const res =  await fetch("http://abdulrahmanfakhri.ide.3wa.io:9602/admin/add-equipment", {
            method: "POST",
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            throw new Error("Failed to add equipment");
        }
        const data1 = await res.json();
            console.log(data1.message);
            navigate(`/control-panel`);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    
    return(
        <main>
            <form>
                {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                
                <label>Name
                <input htmlFor="Name" className="equipment-form" type="text" name="name" onChange={handleChange} value={form.name} />
                </label>
                <br/>
                <label>Damage-Type
                <input htmlFor="Damage-Type" className="equipment-form" type="text" name="damagetype" onChange={handleChange} value={form.damagetype.join(",")} />
                </label>
                <br/>
                <label>Damage
                <input htmlFor="Damage" className="equipment-form" type="number" name="damage" onChange={handleChange} value={form.damage} />
                </label>
                <br/>
                <label>Infusion
                <input htmlFor="Infusion" className="equipment-form" type="checkbox" name="infusion" onChange={handleChange} value={form.infusion} />
                </label>
                <br/>
                <label>Type
                <select htmlFor="Type" className="equipment-form" name="type" onChange={handleChange} value={form.type}>
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
                <br/>
                <label>Image
                <input htmlFor="Image" className="equipment-form" type="file" name="image" onChange={handleflieChange} />
                <br/>
                </label>
                <button onClick={handleSubmit}>Add</button>
            </form>
        </main>
    );
};