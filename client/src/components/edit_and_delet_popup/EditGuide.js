import { useState , useEffect } from "react";
import { FetchUpdate } from "../../helper/fetch.js";
import "./style/editStyle.scss";

export const EditGuide = ({guide , guideId , closeEditGuideModal , onGuideUpdate }) => {
    
    const [title , setTitle] = useState(guide.title);
    const [content , setContent] = useState(guide.content);
    const [link , setLink]= useState(guide.link);
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        setTitle(guide.title);
        setContent(guide.content);
        setLink(guide.link);
        setError(null);
    },[guide]);
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    
    const handleCancel = (e) => {
        e.preventDefault();
        closeEditGuideModal();
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const URL = `/admin/update-article/${guideId}`;
        try{
            const res = await FetchUpdate(URL ,  {title , content , link});
            if (res) {
                onGuideUpdate({ ...guide , title , content , link});
                closeEditGuideModal();
            }
        }catch(err) {
            setError(err.message);
        }
    };
    
    const embedvideo = (link) => {
        const embed = link.replace("watch?v=", "embed/");
        return embed;
    };
    
    return (
        <div className="modal-wrapper">
            <div className="edit-guide">
                <form className="form-edit">
                    <fieldset className="fieldset-edit">
                        <legend>Update Guide</legend>
                        {error && <div className="errorMessage error" style={{ color: "red" }}>{error}</div>}
                        <label>Title</label>
                        <input forhtml="Title" 
                        type="text" 
                        name="title"
                        className="guide-title-form"
                        onChange={handleTitleChange} 
                        value={title} />
                        <label>Content</label>
                        <textarea 
                        forhtml="Content" 
                        name="content" 
                        className="guide-content-form"
                        onChange={handleContentChange} 
                        value={content} >
                        </textarea>
                        <label>Link Youtube video (URL)</label>
                        <input 
                        forhtml="Link" 
                        type="text" 
                        name="link" 
                        className="guide-link-form"
                        onChange={(e)=>setLink(embedvideo(e.target.value))} 
                        value={link} />
                        <div className="edit-guide-btn">
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
      
};