import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";


export const OneBlog = () =>{
    const [blog , setBlog] = useState({});
    const [commentaire , setCommentaire] = useState([]);
    const [error, setError] = useState(null);
    
    const {id} = useParams();
    const URL = `/article/${id}`;
    const URL2 = `/article/${id}/commentaire`;
    
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL);
                setBlog(res);
            }catch(err){
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    
    
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL2);
                setCommentaire(res);
            }catch(err){
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    
    const content = error ? (
        <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
        ) : (
        <main>
            {blog.user ? (
                <div className="blogContainer">
                    <h2 className="blog-title"> Title : {blog.title}</h2>
                    <h4 className="blog-author">Author : {blog.user.username}</h4>
                    <p className="blog-content">{blog.content}</p>
                </div>
            ) : (
                <div className="blogContainer">
                    <h2 className="blog-title"> Title : {blog.title}</h2>
                    <h4 className="blog-author">Author : Unkonwn</h4>
                    <p className="blog-content">{blog.content}</p>
                </div>
            )}
        </main>
        );

    const contentComment = error ? (
        <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
        ) : (
        <div className="comments" >
            <Link className="comment-btn" to={`/commentaire/${id}`}>Comment on the Article</Link>
                {commentaire.map((ele, i) => (
                <div className="comments-list" key={i}>
                    <p className="comments-list-user">{ele.user.username}</p>
                    <p className="comments-list-comment">{ele.content}</p>
                </div>
                ))}
        </div> 
        );

    return (
        <>
            <Header />
            {content}
            {contentComment}
            <Footer />
        </>
    );
};