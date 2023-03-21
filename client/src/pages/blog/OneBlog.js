import { Header } from "../../components/layout/Header.js";
import { useEffect, useState } from "react";
import { useParams , Link} from "react-router-dom";


export const OneBlog = () =>{
    const [blog , setBlog] = useState({});
    const [commentaire , setCommentaire] = useState([]);
    const [error, setError] = useState(null);
    const {id} = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch(`http://abdulrahmanfakhri.ide.3wa.io:9602/article/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });
        if (!res.ok) {
            const error = await res.json();
            setError(error.message);
            return;
        }
        const oneBlog = await res.json();
        setBlog(oneBlog);
        } catch (err) {
        console.log(err);
        }
        };
    fetchData();
    }, []);
    
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch(`http://abdulrahmanfakhri.ide.3wa.io:9602/article/${id}/commentaire`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            });
        if (!res.ok) {
            const error = await res.json();
            setError(error.message);
            return;
        }
        const data = await res.json();
        setCommentaire(data);
        } catch (err) {
        console.log(err);
        }
        };
    fetchData();
    }, []);
    
    useEffect(()=>{
        console.log(commentaire)
    })
    
    const content = error ? (
    <div>{error}</div>
    ) : (
    <main>
    {blog.user &&
        <div className="blogContainer">
            <h2 className="blogTitle"> Title : {blog.title}</h2>
            <h4 className="blogAuthor">Author : {blog.user.username}</h4>
            <p className="blogContent">{blog.content}</p>
        </div>
    }
    </main>
    );

    const contentComment = error ? (
    <div>{error}</div>
    ) : (
    <div className="comments" >
    <Link className="comment-btn" to={"/commentaire"}>Comment on the Article</Link>
        {commentaire.map((ele, i) => (
                <p className="comments-list">{ele.content}</p>
            ))}
    </div> 
    );

    return (
        <>
            <Header />
            {content}
            {contentComment}
        </>
    );
};