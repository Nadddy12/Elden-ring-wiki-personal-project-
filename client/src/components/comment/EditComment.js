import { useState , useEffect } from "react";
import { FetchUpdate } from "../../helper/fetch.js";
import "./style/commentcontrol.scss";

export const EditComment = ({ comment , commentId , closeEditCommentModal , onCommentUpdate}) => {
    
    const [content , setContent] = useState(comment.content);
    const [error , setError] = useState(null);
    
    useEffect(() => {
        setContent(comment.content);
        setError(null);
    },[comment]);
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        closeEditCommentModal();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = `/user/update-commentaire/${commentId}`;
        try{
            const res = await FetchUpdate(URL ,  {content});
            if (res) {
                onCommentUpdate({ ...comment , content});
                closeEditCommentModal();
            }
        }catch(err) {
            setError(err.message);
        }
    };
    
    return (
        <div className="comment-box">
            <form>
                <fieldset>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <textarea
                    className="write-comment"
                    placeholder="Edit your comment"
                    name="content"
                    onChange={handleContentChange} value={content} >
                    </textarea>
                    <div className="btn-wrapper">
                        <button onClick={handleSubmit}>Update</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};