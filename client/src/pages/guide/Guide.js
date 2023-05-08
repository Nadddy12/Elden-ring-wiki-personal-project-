import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { EditGuide } from "../../components/edit_and_delet_popup/EditGuide.js";
import { DeleteGuide } from "../../components/edit_and_delet_popup/DeleteGuide.js";
import { FetchGet } from "../../helper/fetch.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./style/guide.scss";

export const Guide = () => {
    
    const {user} = useSelector(state => state);
    
    const [guides, setGuides] = useState([]);
    const [isEditingGuide , setIsEditingGuide] = useState(false);
    const [editGuideIndex, setEditGuideIndex] = useState(-1);
    const [error, setError] = useState(null);
    
    const URL = "/guide"
    
    // fetching all guides
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL)
                setGuides(res);
            }catch(err){
                setError(err.message)
            }
        };
        fetchData();
    }, []);
    
    // handle updated guide
    const updateGuide = (updatedGuide) => {
        const updatedGuides = guides.map((c) => {
            if (c._id === updatedGuide._id) {
                return updatedGuide;
            }
                return c;
        });
        setGuides(updatedGuides);
    };
    
    
    //pop up window handler for edit guide
    const openEditGuideModal = (index) => {
        setEditGuideIndex(index);
        setIsEditingGuide(true);
    };
    
    const closeEditGuideModal = () => {
        setIsEditingGuide(false);
    };
    
    // btn edit guide
    const btnEditGuide = (ele , i) => {
        return (user.role === 'admin') ? (
            <button className="btn-edit-guide" onClick={() => openEditGuideModal(i)}>
            Edit Guide
            </button>
        ): null;
    }
    
    
const content = error ? (
    <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
    <main>
        <section>
            {guides.map((ele, i) => (
                <div key={i} className="guide-wrapper">
                    <div className="btn-wrapper">
                    {<DeleteGuide guide={ele} guideId={ele._id} 
                        onGuideDelete={(guide)=>setGuides(guides.filter((c) => c._id !== guide._id))}/>}
                    {btnEditGuide(ele , i)}
                    {(isEditingGuide && editGuideIndex === i) && <EditGuide guide={ele} guideId={ele._id}
                        closeEditGuideModal={closeEditGuideModal} onGuideUpdate={updateGuide}/>}
                    </div>
                
                    <h2 className="guide-title" key={i}>{ele.title}</h2>
                    
                    <div className="youtube-link">
                        <iframe
                        className="youtube-video"
                        src={ele.link}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  picture-in-picture"
                        allowFullScreen
                        title={`Guide ${ele.title}`}
                        />
                    </div>
                    
                    <p className="guide-content">{ele.content}</p>
                </div>
            ))}
        </section>
    </main>
    );

    return (
        <>
            <Helmet>
                <title>Elden Ring wiki Fansite - Guides</title>
                <meta 
                    name="description" 
                    content="Discover expert guides and walkthroughs for Elden Ring, the highly anticipated action role-playing game from FromSoftware and George R.R. Martin. Whether you're a veteran Soulsborne player or new to the genre, our comprehensive guides will help you navigate the world of Elden Ring, defeat its fearsome bosses, and uncover its secrets. Join our community of fellow Elden Ring fans and start building your ultimate guide today."
                />
                <meta name="keywords" content="blogs, elden, eldenring, elden ring, game, fromsoftware, multiplayer, community" />
            </Helmet>
            <Header />
            {content}
            <Footer />
        </>
    );
};