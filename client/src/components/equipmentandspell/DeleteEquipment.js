import { useSelector } from "react-redux";
import { useState } from "react";
import { FetchDelete } from "../../helper/fetch.js";
import { MdDelete } from "react-icons/md";

export const DeleteEquipment = ({equipment , equipmentId , onEquipmentDelete}) => {
    
    const {user} = useSelector(state => state);
    const [error, setError] = useState(null);
    
     const deleteEquipment = async () => {
        const URL = `/admin/delete-equipment/${equipmentId}`;
        try {
            await FetchDelete(URL);
            onEquipmentDelete(equipment);
        }catch(err) {
            setError(err.message);
        }
    };
    
    const btnDeleteEquipment = user.role === 'admin' ? (
        <div className="btn-delete-equipment" onClick={() => deleteEquipment()}>
            <MdDelete />
        </div>
    ) : null;
    
    return (
        <>
            { error ? (<div className="errorMessage error" style={{ color: "red" }}>{error}</div>) : (
                btnDeleteEquipment
            )}
        </>
    );
};