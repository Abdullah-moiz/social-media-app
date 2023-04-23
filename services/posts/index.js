import Cookies from "js-cookie";

export const submit_my_post = async (formData) => {
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
