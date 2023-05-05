import { useState , useEffect } from "react";
import { FetchUpdateForm } from "../../helper/fetch.js";
import "./style/editStyle.scss";

export const EditSpell = ({data , dataId , onSpellUpdate , closeEditSpellModal}) => {
    
    const[form , setForm] = useState({
        name: data.name,
        damagetype:data.damagetype,
        damage:data.damage,
        type:data.type,
        image:data.image,
    });
    const [error , setError] = useState(null);
    
    useEffect(() => {
        setForm ({
            name: data.name,
            damagetype:data.damagetype,
            damage:data.damage,
            type:data.type,
            image:data.image,
        });
    },[data]);
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setForm({ ...form , [name]: value });
    };
    
    const handleflieChange = (e) => {
        setForm({ ...form , image: e.target.files[0]});
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        closeEditSpellModal();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const updateData = new FormData();
            updateData.append("name", form.name);
            updateData.append("type", form.type);
            updateData.append("damagetype", form.damagetype);
            updateData.append("damage", form.damage);
            updateData.append("image", form.image);
            
            const URL = `/admin/update-spell/${dataId}`;
            const res = await FetchUpdateForm(URL , updateData );
            if(res) {
                onSpellUpdate({ 
                    ...form,
                    _id:dataId, 
                    name:form.name,
                    image:form.image,
                    damagetype:form.damagetype,
                    damage:form.damage,
                    infusion:form.infusion
                });
                closeEditSpellModal();
            }
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    
    
    return (
        <div className="modal-wrapper">
            <div className="edit-spell">
                <form className="form-edit">
                    <fieldset className="fieldset-edit">
                        <legend>Edit Spell</legend>
                        {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                        <label>Name</label>
                        <input htmlFor="Name" className="equipment-form" type="text" name="name" onChange={handleChange} value={form.name} />
                        <label>Damage-Type</label>
                        <input htmlFor="Damage-Type" className="equipment-form" type="text" name="damagetype" onChange={handleChange} value={form.damagetype} />
                        <label>Damage</label>
                        <input htmlFor="Damage" className="equipment-form" type="number" name="damage" onChange={handleChange} value={form.damage} />
                        <label>Type
                        <select htmlFor="Type" className="equipment-form" name="type" onChange={handleChange} value={form.type}>
                            <option value="none">Select an Option</option>
                            <option value="Incantation">Incantation</option>
                            <option value="Sorcery">Sorcery</option>
                        </select>
                        </label>
                        <label>Image</label>
                        <input htmlFor="Image" className="equipment-form" type="file" name="image" onChange={handleflieChange} />
                        <div className="edit-spell-btn">
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};