export const FetchGet = async (URL) => {
    
    try {
        const res = await fetch(`http://abdulrahmanfakhri.ide.3wa.io:9602${URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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

export const FetchPost = async (URL , data , token) => {
    
    try{
        const res = await fetch(`http://abdulrahmanfakhri.ide.3wa.io:9602${URL}`, {
            method:"post",
            body:JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
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