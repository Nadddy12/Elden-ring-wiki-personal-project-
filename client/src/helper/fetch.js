const getToken = () => {
    const token = localStorage.getItem("jwt")
    if(token){
        return token;
    } else {
        return "";
    }
};

const token = getToken();

export const FetchGet = async (URL) => {
    
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}${URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getToken()}`
            },
        });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const dataGet = await res.json();
        return dataGet;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const FetchPost = async (URL , data) => {
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}${URL}`, {
            method:"POST",
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getToken()}`
            }
        });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const dataPost = await res.json();
        return dataPost;
    }catch(err) {
        throw new Error(err.message);
    }
};

export const FetchDelete = async (URL) => {
    
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}${URL}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getToken()}`
            },
        });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const dataGet = await res.json();
        return dataGet;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const FetchUpdate = async (URL , data) => {
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}${URL}`, {
            method:"PUT",
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getToken()}`
            }
        });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const dataPost = await res.json();
        return dataPost;
    }catch(err) {
        throw new Error(err.message);
    }
};



export const FetchPostForm = async (URL , data ) => {
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}${URL}`, {
            method:"POST",
            body:data,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const dataPostForm = await res.json();
        return dataPostForm;
    }catch(err) {
        throw new Error(err.message);
    }
};


export const FetchUpdateForm = async (URL , data ) => {
    
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}${URL}`, {
            method:"PUT",
            body:data,
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    const dataPostForm = await res.json();
        return dataPostForm;
    }catch(err) {
        throw new Error(err.message);
    }
};