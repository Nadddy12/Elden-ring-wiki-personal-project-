import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { EditSpell } from "../../components/equipmentandspell/EditSpell.js";
import { DeleteSpell } from "../../components/equipmentandspell/DeleteSpell.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./style/spell.scss";

export const Spell = () => {
    
    const {user} = useSelector(state => state);
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isEditingSpell , setIsEditingSpell] = useState(false);
    const [editSpellIndex, setEditSpellIndex] = useState(-1);
    const [displayCount , setDisplayCount] = useState(window.innerHeight);
    
    const URL = `/spell`;
    
    //fetch get all spells
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await FetchGet(URL);
                setData(res);
            }catch(err){
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    
    // handle updated spell
    const updateSpell = (updatedSpell) => {
        const updatedSpells = data.map((c) => {
            if (c._id === updatedSpell._id) {
                return { ...c , ...updatedSpell };
            }
                return c;
        });
        setData(updatedSpells);
    };
    
    //handle pop up window to update spell 
    const openEditSpellModal = (index) => {
        setEditSpellIndex(index);
        setIsEditingSpell(true);
    };
    
    const closeEditSpellModal = () => {
        setIsEditingSpell(false);
    };
    
    // btn edit spell
    const btnEditSpell = (ele , i) => {
        return (user.role === 'admin') ? (
            <div className="btn-edit-spell" onClick={() => openEditSpellModal(i)}>
                <AiFillEdit />
            </div>
        ): null;
    }
    
    //handle render for low devices 
    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setDisplayCount(prevDisplayCount => prevDisplayCount + window.innerHeight);
    }
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    
    const showedData = data.slice(0 , displayCount)
    
    
const content = error ? (
    <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
    <main>
        <section>
            <div className="spellsListContainer">
                <h2 className="page-spell-title">Spells</h2>
                <table>
                    <tbody>
                        {showedData.map((ele, i) => (
                        <tr key={i} className="spells">
                            <td>
                                <Link to={"/spell/" + ele._id} className="spells-name" >{ele.name}</Link>
                            </td>
                            <td>
                                {btnEditSpell(ele , i)}
                                {(isEditingSpell && editSpellIndex === i) && <EditSpell data={ele} dataId={ele._id}
                                    closeEditSpellModal={closeEditSpellModal} onSpellUpdate={updateSpell}/> }
                                {<DeleteSpell spell={ele} spellId={ele._id} 
                                    onSpellDelete={(spell)=>setData(data.filter((c) => c._id !== spell._id))}/>}
                            </td>
                            <td className="td-img">
                                <img className="spells-img" src={`${process.env.REACT_APP_API_URL}/${ele.image[0]}`} alt={ele.name}/>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    </main>
    );

    return (
        <>
            <Header />
            {content}
            <Footer />
        </>
    );
};