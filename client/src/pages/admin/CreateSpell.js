import { useNavigate } from "react-router-dom";
import { useState } from "react";


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
            
        const res =  await fetch("http://abdulrahmanfakhri.ide.3wa.io:9602/admin/add-spell", {
            method: "POST",
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        if (!res.ok) {
            throw new Error("Failed to add spell");
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
                <input htmlFor="Name" className="spell-form" type="text" name="name" onChange={handleChange} value={form.name} />
                </label>
                <br/>
                <label>Damage-Type
                <input htmlFor="Damage-Type" className="spell-form" type="text" name="damagetype" onChange={handleChange} value={form.damagetype} />
                </label>
                <br/>
                <label>Damage
                <input htmlFor="Damage" className="spell-form" type="number" name="damage" onChange={handleChange} value={form.damage} />
                </label>
                <br/>
                <label>Type
                <select htmlFor="Type" className="spell-form" name="type" onChange={handleChange} value={form.type}>
                    <option value="Incantation">Incantation</option>
                    <option value="Sorcer">Sorcer</option>
                </select>
                </label>
                <br/>
                <label>Image
                <input htmlFor="Image" className="spell-form" type="file" name="image" onChange={handleflieChange} />
                </label>
                <br/>
                <button onClick={handleSubmit}>Add</button>
            </form>
        </main>
    );
};