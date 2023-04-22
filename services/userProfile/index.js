import Cookies from "js-cookie";

export const update_my_profile = async (formData) => {

    console.log(formData);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/profile`, {
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
        console.log('error in updating Profile  (service) => ', error);
    }
}
