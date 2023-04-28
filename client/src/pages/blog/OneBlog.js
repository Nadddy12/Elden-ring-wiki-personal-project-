import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { EditBlog } from "../../components/editblog/EditBlog.js";
import { CreateComment } from "../../components/comment/CreateComment.js";
import { FetchGet , FetchDelete } from "../../helper/fetch.js";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams , Link} from "react-router-dom";
import "./style/oneblog.scss";


export const OneBlog = () =>{
    
    const {user} = useSelector(state => state);
    
    const [blog , setBlog] = useState({});
    const [commentaire , setCommentaire] = useState([]);
    const [isEditingBlog , setIsEditingBlog] = useState(false);
    const [isCreateComment , setIsCreateComment] = useState(false);
    const [error, setError] = useState(null);
    
    const {id} = useParams();
    const URL = `/article/${id}`;
    const URL2 = `/article/${id}/commentaire`;
    
    //fetch get blog
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
    
    //fetch get comments
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
    
    //fetch delete blog
    const deleteBlog = async (role) => {
        const URL = role === 'admin' ? `/admin/delete-article/${id}` : `/mod/delete-article/${id}`;
        try {
            await FetchDelete(URL)
        }catch(err) {
            setError(err.message);
        }
    }
    
    //update blog
    const updateBlog = (updateBlog) => {
        setBlog(updateBlog);
    }
    
    // pop up window handler for edit blog
    const openEditModal = () => {
        setIsEditingBlog(true);
    };
    
    const closeEditModal = () => {
        setIsEditingBlog(false);
    };
    
    //pop up window handler for create comment
    const openCreateCommentModal = () => {
        setIsCreateComment(true);
    };
    
    const closeCreateCommentModal = () => {
        setIsCreateComment(false);
    };
    
    //rendering part
    
    //btn for blog
    const btnEditBlog = (user.role === 'admin' || ( user.role === 'mod' && blog.user && user.username === blog.user.username )) ? (
        <button className="btn-edit-blog" onClick={openEditModal}>
        Edit post
        </button>
    ) : null;
    
    const btnDeleteBlog = (user.role === 'admin' || ( user.role === 'mod' && blog.user && user.username === blog.user.username )) ? (
        <button className="btn-delete-blog" onClick={() => deleteBlog(user.role)}>
        Delete post
        </button>
    ) : null;
        
    //btn for comment
    const btnCreateComment = (user.role === 'user' || user.role === 'admin' || user.role === 'mod') ? (
        <button className="btn-create-comment" onClick={openCreateCommentModal}>
        Comment
        </button>
    ): null;
    
    // comment 
    const contentComment = error ? (
        <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
        ) : (
        <div className="comments" >
            {isCreateComment && <CreateComment closeCreateCommentModal={closeCreateCommentModal} />}
            {commentaire.map((ele, i) => (
            <div className="comments-list" key={i}>
                <p className="comments-list-user">{ele.user.username}</p>
                <p className="comments-list-content">{ele.content}</p>
            </div>
            ))}
        </div> 
    );
    
    // main blog
    const content = error ? (
        <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
        ) : (
        <main>
            <section>
                {btnDeleteBlog}
                {btnEditBlog}
                {blog.user ? (
                    <div className="blogContainer">
                        <h2 className="blog-title"> Title : {blog.title}</h2>
                        <h4 className="blog-author">Author : {blog.user.username}</h4>
                        <p className="blog-content">{blog.content}</p>
                    </div>
                ) : (
                    <div className="blogContainer">
                        <h2 className="blog-title"> Title : {blog.title}</h2>
                        <h4 className="blog-author">Author : Deleted User</h4>
                        <p className="blog-content">{blog.content}</p>
                    </div>
                )}
                {btnCreateComment}
                {contentComment}
            </section>
        </main>
        );

    return (
        <>
            <Header />
            {content}
            {isEditingBlog && <EditBlog blog={blog} closeEditModal={closeEditModal} onBlogUpdate={updateBlog} />}
            <Footer />
        </>
    );
};