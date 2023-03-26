import { useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const CreateCommentaire = () => {
    
    const {user} = useSelector(state => state);
    
    const [content , setContent] = useState("");
    const [error , setError] = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    const token = localStorage.getItem("jwt");
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch(`http://abdulrahmanfakhri.ide.3wa.io:9602/user/article/${id}/create-commentaire`, {
                method:"post",
                body:JSON.stringify({content , userId: user.id}),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            if(!res.ok){
                const error = await res.json();
                setError(error.message);
                return;
            }
            const data = await res.json();
            console.log(data);
        }catch(err){
            console.log(err);
        }
        navigate(`/article/${id}`);
    };
    
    return(
        <div>
            <form>
                {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                <label>comment</label>
                <textarea forhtml="comment" className="comment" name="content" onChange={(e)=>setContent(e.target.value)} value={content} >
                </textarea>
                <button onClick={handleSubmit}>Comment</button>
            </form>
        </div>
    );
};