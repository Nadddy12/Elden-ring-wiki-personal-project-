import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FetchUpdate } from "../../helper/fetch.js";
import "./style/editStyle.scss";

export const EditBlog = ({ blog , closeEditModal , onBlogUpdate}) => {
    
    const {user} = useSelector(state => state);
    
    const [title , setTitle] = useState(blog.title);
    const [content , setContent] = useState(blog.content);
    const [error , setError] = useState(null);
    
    const {id} = useParams();
    
    useEffect(() => {
        setTitle(blog.title);
        setContent(blog.content);
        setError(null);
    },[blog]);
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        closeEditModal();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = user.role === "admin" ? `/admin/update-article/${id}` : `/mod/update-article/${id}`;
        try{
            const res = await FetchUpdate(URL , {title , content});
            if (res) {
                onBlogUpdate({ ...blog , title , content});
                closeEditModal();
            }
        }catch(err) {
            setError(err.message);
        }
    };
    
    return (
        <div className="modal-wrapper">
            <div className="edit-blog">
                <form className="form-edit">
                    <fieldset className="fieldset-edit">
                        <legend>Edit Blog</legend>
                        {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                        <label>Title</label>
                        <input 
                        forhtml="Title" 
                        className="blog-title-form" 
                        type="text" 
                        name="title" 
                        onChange={handleTitleChange} 
                        value={title} />
                        <label>Content</label>
                        <textarea 
                        forhtml="Content" 
                        className="blog-content-form" 
                        name="content" 
                        onChange={handleContentChange} 
                        value={content} >
                        </textarea>
                        <div className="edit-blog-btn">
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};