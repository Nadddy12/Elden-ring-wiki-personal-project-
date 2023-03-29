import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FetchPost } from "../../helper/fetch.js";
import { Header } from "../../components/layout/Header.js"
import { Footer } from "../../components/layout/Footer.js"
import "./style/style.scss";

export const CreateBlog = () => {
    const {user} = useSelector(state => state);
    
    const [title , setTitle] = useState("");
    const [content , setContent] = useState("");
    const [type , setType] = useState("blog");
    
    const [error , setError] = useState(null);
    
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const URL = ("/admin/create-article");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { title, content, type, userId: user.id };
            const res = await FetchPost(URL, data, token);
            console.log(res);
            navigate(`/control-panel`);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };
    
    return(
        <>
        <Header />
        <main className="admin-form">
            <form>
                <fieldset>
                    <legend>Create Article</legend>
                    {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                    <label>Title</label>
                    <input forhtml="Title" className="blog-title-form" type="text" name="" onChange={(e)=>setTitle(e.target.value)} value={title} />
                    <label>Content</label>
                    <textarea forhtml="Content" className="blog-content-form" name="content" onChange={(e)=>setContent(e.target.value)} value={content} >
                    </textarea>
                    <button onClick={handleSubmit}>Add</button>
                </fieldset>
            </form>
        </main>
        <Footer />
        </>
    );
};