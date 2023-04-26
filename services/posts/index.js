import Cookies from "js-cookie";

export const submitMyPost = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in submitting Post  (service) => ', error);
    }
}


export const getAllPosts = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting Post  (service) => ', error);
    }
}



export const getAllPostsOfSpecifiedUser = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post/getSpecifiedPostOfUser?id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in getting specified Post  (service) => ', error);
    }
}




export const deletePostOfSpecifiedUser = async (postID, userID) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post?postID=${postID}&userID=${userID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in deleting specified Post  (service) => ', error);
    }
}



export const updatePostOfSpecifiedUser = async (formData) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in updating specified Post  (service) => ', error);
    }
}
