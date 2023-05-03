import { useSelector } from "react-redux";
import { useState } from "react";
import { FetchDelete } from "../../helper/fetch.js";
import { MdDelete } from "react-icons/md";

export const DeleteCharacter = ({character , characterId , onCharacterDelete}) => {
    
    const {user} = useSelector(state => state);
    const [error, setError] = useState(null);
    
    const deleteCharacter = async () => {
        const URL = `/user/delete-character/${characterId}`;
        try {
            await FetchDelete(URL);
            onCharacterDelete(character);
        }catch(err) {
            setError(err.message);
        }
    };
    
    // this condition is not necessary since i did already protected by backend and the fact that each user will only have his characters
    const btnDeleteCharacter = user.id === character.user ? (
        <div className="btn-delete-spell" onClick={() => deleteCharacter()}>
            <MdDelete />
        </div>
    ) : null;
    
    return (
        <>
            { error ? (<div className="errorMessage error" style={{ color: "red" }}>{error}</div>) : (
                btnDeleteCharacter
            )}
        </>
    );
};