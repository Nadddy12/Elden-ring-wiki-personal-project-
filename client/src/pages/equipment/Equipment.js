import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { EditEquipment } from "../../components/equipmentandspell/EditEquipment.js";
import { DeleteEquipment } from "../../components/equipmentandspell/DeleteEquipment.js";
import { FetchGet } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import "./style/equipment.scss";

export const Equipment = () => {
    
    const {user} = useSelector(state => state);
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isEditingEquipment , setIsEditingEquipment] = useState(false);
    const [editEquipmentIndex, setEditEquipmentIndex] = useState(-1);
    const [displayCount , setDisplayCount] = useState(window.innerHeight);
    
    const URL = `/equipment`;
    
    //fetch get all the equipment
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
    
    
    // handle updated equipment
    const updateEquipment = (updatedEquipment) => {
        const updatedEquipments = data.map((c) => {
            if (c._id === updatedEquipment._id) {
                return { ...c , ...updatedEquipment };
            }
                return c;
        });
        setData(updatedEquipments);
    };
    
    //handle pop up window to update equipment 
    const openEditEquipmentModal = (index) => {
        setEditEquipmentIndex(index);
        setIsEditingEquipment(true);
    };
    
    const closeEditEquipmentModal = () => {
        setIsEditingEquipment(false);
    };
    
    // btn edit equipment
    const btnEditEquipment = (ele , i) => {
        return (user.role === 'admin') ? (
            <div className="btn-edit-equipment" onClick={() => openEditEquipmentModal(i)}>
            <AiFillEdit />
            </div>
        ): null;
    }
    
    
    //handle the render with each scroll for helping low devices
    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setDisplayCount(prevDisplayCount => prevDisplayCount + window.innerHeight);
    }
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])
    
    const showedData = data.slice(0 , displayCount)
    
    //render part 
const content = error ? (
    <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
    <main>
        <section>
            <div className="equipmentsListContainer">
                <h2 className="page-equipment-title">Equipments</h2>
                <table>
                    <tbody>
                        {showedData.map((ele, i) => (
                            <tr key={i} className="equipments">
                                <td>
                                    <Link to={"/equipment/" + ele._id} className="equipments-name" >{ele.name}</Link>
                                </td>
                                <td>
                                    {btnEditEquipment(ele , i)}
                                    {(isEditingEquipment && editEquipmentIndex === i) && <EditEquipment data={ele} dataId={ele._id}
                                        closeEditEquipmentModal={closeEditEquipmentModal} onEquipmentUpdate={updateEquipment}/> }
                                    {<DeleteEquipment equipment={ele} equipmentId={ele._id} 
                                        onEquipmentDelete={(equipment)=>setData(data.filter((c) => c._id !== equipment._id))}/>}
                                </td>
                                <td className="td-img">
                                    <img className="equipments-img" src={`${process.env.REACT_APP_API_URL}/${ele.image[0]}`} alt={ele.name}/>
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