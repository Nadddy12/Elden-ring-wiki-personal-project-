import { useState , useEffect } from "react";
import { FetchUpdateForm } from "../../helper/fetch.js";
import "./style/editStyle.scss";

export const EditEquipment = ({data , dataId , onEquipmentUpdate , closeEditEquipmentModal}) => {
    
    const[form , setForm] = useState({
        name: data.name,
        damagetype:data.damagetype,
        damage:data.damage,
        infusion:data.infusion,
        type:data.type,
        image:data.image,
    });
    const [error , setError] = useState(null);
    
    useEffect(() => {
        setForm ({
            name: data.name,
            damagetype:data.damagetype,
            damage:data.damage,
            infusion:data.infusion,
            type:data.type,
            image:data.image,
        });
    },[data]);
    
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
    
    const handleCancel = (e) => {
        e.preventDefault();
        closeEditEquipmentModal();
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const updateData = new FormData();
            updateData.append("name", form.name);
            updateData.append("type", form.type);
            updateData.append("damagetype", form.damagetype.join(","));
            updateData.append("damage", form.damage);
            updateData.append("infusion", form.infusion);
            updateData.append("image", form.image);
            
            const URL = `/admin/update-equipment/${dataId}`;
            const res = await FetchUpdateForm(URL , updateData );
            if(res) {
                onEquipmentUpdate({ 
                    ...form,
                    _id:dataId, 
                    name:form.name,
                    image:form.image,
                    damagetype:Array.isArray(form.damagetype) ? form.damagetype.join(",") : form.damagetype,
                    damage:form.damage,
                    infusion:form.infusion
                });
                closeEditEquipmentModal();
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    
    return (
        <div className="modal-wrapper">
            <div className="edit-equipment">
                <form>
                    <fieldset>
                        <legend>Edit Equipment</legend>
                        {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                        <label>Name</label>
                        <input htmlFor="Name" type="text" name="name" onChange={handleChange} value={form.name} />
                        <label>Damage-Type  ( Seperate the type by using  ","  without space )</label>
                        <input htmlFor="Damage-Type" type="text" name="damagetype" onChange={handleChange} value={Array.isArray(form.damagetype) ? form.damagetype.join(",") : form.damagetype} />
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
                        <div className="edit-equipment-btn">
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};