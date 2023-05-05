import { useSelector } from "react-redux";
import { useState } from "react";
import { FetchDelete } from "../../helper/fetch.js";

export const DeleteGuide = ({guide , guideId , onGuideDelete}) => {
    
    const {user} = useSelector(state => state);
    const [error, setError] = useState(null);
    
     const deleteGuide = async () => {
        const URL = `/admin/delete-article/${guideId}`;
        try {
            await FetchDelete(URL);
            onGuideDelete(guide);
        }catch(err) {
            setError(err.message);
        }
    };
    
    const btnDeleteGuide = user.role === 'admin' ? (
        <button className="btn-delete-guide" onClick={() => deleteGuide()}>
            Delete Guide
        </button>
    ) : null;
    
    return (
        <>
            { error ? (<div className="errorMessage error" style={{ color: "red" }}>{error}</div>) : (
            btnDeleteGuide
            )}
            
        </>
    );
};