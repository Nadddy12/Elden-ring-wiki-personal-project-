import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../components/layout/Header.js"
import { Footer } from "../../components/layout/Footer.js"
import "./style/style.scss";
// import { FetchPostForm } from "../../../helper/fetch.js";

export const CreateSpell  = () => {
    
    const [form , setForm] = useState({
        name: "",
        damagetype:"",
        damage:0,
        type:"",
        image: null,
    });
    
    const [error , setError] = useState(null);
    
    const navigate = useNavigate();
    
    const token = localStorage.getItem("jwt");
    
    // const URL = (`/admin/add-equipment`);
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setForm({ ...form , [name]: value });
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
            data.append("damagetype", form.damagetype);
            data.append("damage", form.damage);
            data.append("image", form.image);
            console.log(data.get("name"))
            
            
        const res =  await fetch("http://abdulrahmanfakhri.ide.3wa.io:9602/admin/add-spell", {
            method: "POST",
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
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
        <>
        <Header />
        <main className="admin-form">
            <form>
                <fieldset>
                    <legend>Create Spell</legend>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <label>Name</label>
                    <input htmlFor="Name" className="equipment-form" type="text" name="name" onChange={handleChange} value={form.name} />
                    
                    <label>Damage-Type</label>
                    <input htmlFor="Damage-Type" className="equipment-form" type="text" name="damagetype" onChange={handleChange} value={form.damagetype} />
                    <label>Damage</label>
                    <input htmlFor="Damage" className="equipment-form" type="number" name="damage" onChange={handleChange} value={form.damage} />
                    <label>Type
                    <select htmlFor="Type" className="equipment-form" name="type" onChange={handleChange} value={form.type}>
                        <option value="none" selected>Select an Option</option>
                        <option value="Incantation">Incantation</option>
                        <option value="Sorcery">Sorcery</option>
                    </select>
                    </label>
                    <label>Image</label>
                    <input htmlFor="Image" className="equipment-form" type="file" name="image" onChange={handleflieChange} />
                    <button onClick={handleSubmit}>Add</button>
                </fieldset>
            </form>
        </main>
        <Footer />
        </>
    );
};