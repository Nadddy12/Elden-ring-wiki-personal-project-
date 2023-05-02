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
    
    
    // handle input first letter and make big latter
    
    const handleTitleInput = (e) => {
        setTitle(e.target.value.replace(/^\w/, (c) => c.toUpperCase()));
    }
    
    const handleContentInput = (e) => {
        setContent(e.target.value.replace(/^\w/, (c) => c.toUpperCase()));
    }
    
    // handle submit form
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { title, content, type, userId: user.id };
            const URL = user.role === "admin" ? "/admin/create-article" : "/mod/create-article";
            const res = await FetchPost(URL, data);
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
                        <input forhtml="Title" className="blog-title-form" type="text" name="" onChange={handleTitleInput} value={title} />
                        <label>Content</label>
                        <textarea forhtml="Content" className="blog-content-form" name="content" onChange={handleContentInput} value={content} >
                        </textarea>
                        <button onClick={handleSubmit}>Add</button>
                    </fieldset>
                </form>
            </main>
        <Footer />
        </>
    );
};