import { useState  } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FetchPost } from "../../helper/fetch.js";
import "./style/createComment.scss";

export const CreateComment = ({closeCreateCommentModal , onCommentCreate}) => {
    
    const {user} = useSelector(state => state);
    
    const [content , setContent] = useState("");
    const [error , setError] = useState(null);
    
    const {id} = useParams();
    
    
    const handleContentInput = (e) => {
        setContent(e.target.value.replace(/^\w/, (c) => c.toUpperCase()));
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        closeCreateCommentModal();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = { content , userId: user.id };
            const URL = `/user/article/${id}/create-commentaire`;
            const res = await FetchPost(URL, data);
            if (res) {
                const newComment = { _id: res._id , content , user: { username: user.username } };
                onCommentCreate(newComment);
                closeCreateCommentModal();
            }
        }catch(err) {
            setError(err);
        }
    };
    
    return (
        <div className="comment-box">
            <form>
                <fieldset>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <textarea
                    className="write-comment"
                    placeholder="Write your comment"
                    name="content"
                    onChange={handleContentInput} value={content} >
                    </textarea>
                    <div className="btn-wrapper">
                        <button onClick={handleSubmit}>Comment</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};