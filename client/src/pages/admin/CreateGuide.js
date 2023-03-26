import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FetchPost } from "../../helper/fetch.js";

export const CreateGuide = () => {
    const {user} = useSelector(state => state);
    
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const [link , setLink]= useState("");
    const [type , setType] = useState("guide");
    
    const [error , setError] = useState(null);
    
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const URL = ("/admin/create-article");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { title, content, type, link , userId: user.id };
            const res = await FetchPost(URL, data, token);
            console.log(res);
            navigate(`/control-panel`);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    
    const embedvideo = (link) => {
        const embed = link.replace("watch?v=", "embed/");
        return embed;
    };
    
    return(
        <main>
            <form>
                {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                <label>Title</label>
                <input forhtml="Title" className="blog-title-form" type="text" name="title" onChange={(e)=>setTitle(e.target.value)} value={title} />
                <br/>
                <label>Content</label>
                <textarea forhtml="Content" className="blog-content-form" name="content" onChange={(e)=>setContent(e.target.value)} value={content} >
                </textarea>
                <br/>
                <label>Link</label>
                <input forhtml="Link" className="blog-link-form" type="text" name="link" onChange={(e)=>setLink(embedvideo(e.target.value))} value={link} />
                <br/>
                <button onClick={handleSubmit}>Add</button>
            </form>
        </main>
    );
};