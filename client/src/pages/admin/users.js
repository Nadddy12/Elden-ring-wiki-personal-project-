import { Header } from "../../components/layout/Header.js";
import { Footer } from "../../components/layout/Footer.js";
import { FetchGet , FetchDelete , FetchUpdate } from "../../helper/fetch.js";
import { useEffect, useState } from "react";
import "./style/users.scss";

export const Users = () => {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [checkedRoles, setCheckedRoles] = useState({});
    
    const URL = `/admin/user`;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await FetchGet(URL);
                setData(res);
                const defaultCheckedRoles = res.reduce((acc, curr) => {
                    return {
                        ...acc,
                        [curr._id]: curr.role === "mod" ? "mod" : "user"
                    }
                }, {});
                setCheckedRoles(defaultCheckedRoles);
            }catch(err){
                setError(err.message);
            }
        };
        fetchData();
    }, []);
    
    
    const handleDelete = async (id) => {
        try{
            await FetchDelete(`/admin/delete-user/${id}`);
            setData(data.filter((user) => user._id !== id));
        }
        catch(err){
            setError(err.message);
        }
    };
    
    const handleUpdate = async (id) => {
        try {
            const newRole = checkedRoles[id] === "mod" ? "user" : "mod";
            await FetchUpdate(`/admin/update-user/${id}`, { role: newRole });
            setData((prevData) =>
                prevData.map((user) => {
                    if (user._id === id) {
                        return { ...user, role: newRole };
                    }
                    return user;
                })  
            );
        } catch (err) {
          setError(err.message);
        }
    };
    
    const handleRoleChange = (id, role) => {
        setCheckedRoles((prevCheckedRoles) => ({
            ...prevCheckedRoles,
            [id]: role,
        }));
    };
    
const content = error ? (
    <div className="errorMessage error" style={{ color: "red" }}>{error}</div>
    ) : (
    <main className="all-users">
        <div className="userListContainer">
            {data.map((ele, i) => (
                <div key={i} className="users">
                    <p className="user-name">Username : {ele.username}</p>
                    <p className="user-role">Role : {ele.role}</p>
                    {ele.role !== "admin" && (
                    <div className="modification">
                        <div className="users-modification">
                            <label>User
                            <input type="checkbox" checked={checkedRoles[ele._id] === "mod"} onChange={() => handleRoleChange(ele._id, "mod")}/>
                            </label>
                            <label>Mod
                            <input type="checkbox" checked={checkedRoles[ele._id] !== "mod"} onChange={() => handleRoleChange(ele._id, "user")}/>
                            </label>
                        </div>
                        <button onClick={() => handleDelete(ele._id)}>Delete</button>
                        <button onClick={() => handleUpdate(ele._id)}>Update</button>
                    </div>
                    )}
                </div>
            ))}
        </div>
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