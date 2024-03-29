import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FetchPost } from "../../helper/fetch.js";
import { Header } from "../../components/layout/Header.js"
import { Footer } from "../../components/layout/Footer.js"

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
            navigate(`/control-panel`);
        } catch (err) {
            setError(err.message);
        }
    };
    
    const embedvideo = (link) => {
        const embed = link.replace("watch?v=", "embed/");
        return embed;
    };
    
    return(
        <>
        <Header />
        <main className="admin-form">
            <form>
                <fieldset>
                    <legend>Create Guide</legend>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <label>Title</label>
                    <input forhtml="Title" 
                    type="text" 
                    name="title"
                    placeholder="Wrtie the title"
                    onChange={(e)=>setTitle(e.target.value.replace(/^\w/, (c) => c.toUpperCase()))} 
                    value={title} />
                    <label>Content</label>
                    <textarea 
                    forhtml="Content" 
                    name="content" 
                    placeholder="Write the content"
                    onChange={(e)=>setContent(e.target.value.replace(/^\w/, (c) => c.toUpperCase()))} 
                    value={content} >
                    </textarea>
                    <label>Link Youtube video (URL)</label>
                    <input 
                    forhtml="Link" 
                    type="text" 
                    name="link" 
                    placeholder="Past the URL from Youtube"
                    onChange={(e)=>setLink(embedvideo(e.target.value))} 
                    value={link} />
                    <button onClick={handleSubmit}>Add</button>
                </fieldset>
            </form>
        </main>
        <Footer />
        </>
    );
};