import { useSelector } from "react-redux";
import { useState } from "react";
import { FetchDelete } from "../../helper/fetch.js";
import { MdDelete } from "react-icons/md";

export const DeleteSpell = ({spell , spellId , onSpellDelete }) => {
    
    const {user} = useSelector(state => state);
    const [error, setError] = useState(null);
    
    const deleteSpell = async () => {
        const URL = `/admin/delete-spell/${spellId}`;
        try {
            await FetchDelete(URL);
            onSpellDelete(spell);
        }catch(err) {
            setError(err.message);
        }
    };
    
    const btnDeleteSpell = user.role === 'admin' ? (
        <div className="btn-delete-spell" onClick={() => deleteSpell()}>
            <MdDelete />
        </div>
    ) : null;
    
    return (
        <>
            { error ? (<div className="errorMessage error" style={{ color: "red" }}>{error}</div>) : (
                btnDeleteSpell
            )}
        </>
    );
};