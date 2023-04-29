import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FetchDelete } from "../../helper/fetch.js";

export const DeleteComment = ({comment , commentId , onCommentDelete}) => {
    
    const {user} = useSelector(state => state);
    const [error, setError] = useState(null);
    
    const deleteComment = async (role) => {
        let URL;
        if(role === 'admin') {
            URL = `/admin/delete-commentaire/${commentId}`;
        } else if (role === 'mod') {
            URL = `/mod/delete-commentaire/${commentId}`;
        } else {
            URL = `/user/delete-commentaire/${commentId}`;
        }
        try {
            await FetchDelete(URL);
            onCommentDelete(comment);
        }catch(err) {
            setError(err.message);
        }
    };
    
    const btnDeleteComment = (user.role === 'admin' || ( user.role === 'user' && comment.user && user.username === comment.user.username ) || (user.role === 'mod' && comment.user && comment.user.username !== 'admin')) ? (
        <button className="btn-delet-comment-blog" onClick={() => deleteComment(user.role)}>
        Delete
        </button>
    ) : null;
    
    return (
        <>
            { error ? (<div className="errorMessage error" style={{ color: "red" }}>{error}</div>) : (
            btnDeleteComment
            )}
            
        </>
    );
};